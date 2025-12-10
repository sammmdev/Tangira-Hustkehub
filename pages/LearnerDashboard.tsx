import React, { useState } from 'react';
import { User, Course, Gig } from '../types';
import { getCoachResponse } from '../services/geminiService';

interface LearnerDashboardProps {
  user: User;
  gigs: Gig[];
  activeView?: 'hub' | 'find-work' | 'my-jobs';
}

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ user, gigs, activeView = 'hub' }) => {
  
  // Mock Data
  const courses: Course[] = [
    { id: '1', title: 'Digital Marketing 101', provider: 'Akello', duration: '2h', xp: 50, category: 'Marketing', progress: 100, unlocksSkill: 'Social Media' },
    { id: '2', title: 'Excel Fundamentals', provider: 'Tangira', duration: '45m', xp: 20, category: 'Admin', progress: 60, unlocksSkill: 'Excel' },
    { id: '3', title: 'Intro to AI Tools', provider: 'Tangira', duration: '1.5h', xp: 40, category: 'Tech', progress: 0, unlocksSkill: 'AI Prompting' },
    { id: '4', title: 'Canva Design Basics', provider: 'Akello', duration: '1h', xp: 30, category: 'Design', progress: 0, unlocksSkill: 'Canva' },
  ];

  // (Removed local allGigs, now using 'gigs' prop)

  const leaderboardData = [
    { rank: 1, name: 'Nyasha T.', xp: 850, avatar: 'N' },
    { rank: 2, name: 'Farai M.', xp: 820, avatar: 'F' },
    { rank: 3, name: user.name, xp: user.skillScore?.total || 720, avatar: user.name.charAt(0), isUser: true },
    { rank: 4, name: 'Blessing K.', xp: 690, avatar: 'B' },
    { rank: 5, name: 'Chipo D.', xp: 650, avatar: 'C' },
  ];

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'ai', text: string}[]>([
    { sender: 'ai', text: `Mhoro ${user.name}! I'm your Tangira Coach. I can help you find gigs or improve your score.` }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setIsTyping(true);
    const response = await getCoachResponse(userMsg);
    setIsTyping(false);
    setChatHistory(prev => [...prev, { sender: 'ai', text: response }]);
  };

  const hasSkill = (requiredSkills: string[]) => {
    return requiredSkills.every(skill => user.skills.includes(skill));
  };

  // ---------------- VIEW: HUB ---------------- //
  if (activeView === 'hub') {
    return (
      <div className="pt-28 pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (Profile & Stats) - Span 4 */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Profile Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center relative overflow-hidden border border-slate-100/50">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-emerald-100/80 to-teal-50/50"></div>
                    <div className="relative z-10">
                        <div className="w-24 h-24 mx-auto rounded-full bg-white p-1.5 shadow-xl shadow-emerald-500/10 mb-4">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl font-bold text-white">
                                {user.avatar.includes('http') ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="avatar"/> : user.name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="font-bold text-slate-900 text-2xl tracking-tight mb-1">{user.name}</h2>
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full mb-6">
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{user.level} Level</span>
                            {user.level === 'Rising' && <span className="text-xs">🚀</span>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                                <div className="text-2xl font-extrabold text-slate-800">${user.walletBalance.toFixed(2)}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Wallet</div>
                            </div>
                            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                                <div className="text-2xl font-extrabold text-emerald-600">{user.skillScore?.total}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skill Score</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SkillToken Marketplace */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">SkillTokens</h3>
                                <p className="text-indigo-200 text-xs">Redeem for data & rewards</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 font-bold">
                                {user.tokens} ST
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 flex items-center justify-between transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">📡</span>
                                    <div className="text-left">
                                        <div className="text-xs font-bold">Daily Data Bundle</div>
                                        <div className="text-[10px] text-indigo-200">Econet • 200MB</div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-white text-indigo-700 px-2 py-1 rounded">50 ST</span>
                            </button>
                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 flex items-center justify-between transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">🎓</span>
                                    <div className="text-left">
                                        <div className="text-xs font-bold">Pro Course Access</div>
                                        <div className="text-[10px] text-indigo-200">Advanced Python</div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-white text-indigo-700 px-2 py-1 rounded">200 ST</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">Achievements</h3>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full uppercase tracking-wide">{user.badges?.filter(b => b.unlocked).length} Unlocked</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {user.badges?.map(badge => (
                            <div key={badge.id} className="group relative flex flex-col items-center">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${badge.unlocked ? 'bg-amber-50 text-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-100' : 'bg-slate-50 text-slate-300 opacity-60'}`}>
                                    {badge.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column - Span 8 */}
            <div className="lg:col-span-8 space-y-6">
                
                 {/* Career Ladder Progress */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Career Ladder</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">Level up to unlock higher paying gigs.</p>
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                            Current: {user.level}
                        </div>
                    </div>
                    
                    <div className="relative px-2 py-2">
                        {/* Progress Bar Background */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 rounded-full -translate-y-1/2 z-0"></div>
                        
                        {/* Active Progress (Approximation based on level) */}
                        <div 
                            className="absolute top-1/2 left-0 h-1 bg-emerald-500 rounded-full -translate-y-1/2 z-0 transition-all duration-1000" 
                            style={{ width: user.level === 'Starter' ? '12%' : user.level === 'Rising' ? '45%' : user.level === 'Pro' ? '78%' : '100%' }}
                        ></div>

                        <div className="relative z-10 flex justify-between w-full">
                            {['Starter', 'Rising', 'Pro', 'Elite'].map((level, index) => {
                                const isCurrent = user.level === level;
                                const isPast = ['Starter', 'Rising', 'Pro', 'Elite'].indexOf(user.level) > index;
                                const isFuture = !isCurrent && !isPast;
                                
                                return (
                                    <div key={level} className="flex flex-col items-center group cursor-default w-16">
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 mb-2
                                            ${isCurrent ? 'bg-white border-emerald-500 shadow-lg scale-110 ring-4 ring-emerald-500/10' : 
                                              isPast ? 'bg-emerald-500 border-emerald-500 text-white' : 
                                              'bg-white border-slate-200 text-slate-300'}
                                        `}>
                                            {isPast ? (
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg>
                                            ) : (
                                                <span className={`text-[10px] font-bold ${isCurrent ? 'text-emerald-700' : ''}`}>{index + 1}</span>
                                            )}
                                        </div>
                                        <span className={`text-xs font-bold ${isCurrent ? 'text-emerald-700' : isPast ? 'text-emerald-600' : 'text-slate-300'}`}>
                                            {level}
                                        </span>
                                        
                                        {/* Perk Tooltip (Always visible for current/next) */}
                                        <div className={`
                                            mt-1 text-[9px] font-bold text-center px-2 py-0.5 rounded-full whitespace-nowrap
                                            ${isCurrent ? 'bg-emerald-50 text-emerald-600' : 
                                              user.level === 'Starter' && level === 'Rising' ? 'bg-amber-50 text-amber-600' :
                                              user.level === 'Rising' && level === 'Pro' ? 'bg-blue-50 text-blue-600' :
                                              user.level === 'Pro' && level === 'Elite' ? 'bg-purple-50 text-purple-600' :
                                              'opacity-0 group-hover:opacity-100 text-slate-400'}
                                        `}>
                                            {level === 'Starter' ? 'Basic Tasks' : 
                                             level === 'Rising' ? 'Unlock $10+ Gigs' : 
                                             level === 'Pro' ? 'Unlock Mentorship' : 
                                             'Elite Contracts'}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Next Level Info */}
                    {user.level !== 'Elite' && (
                        <div className="mt-8 bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg shrink-0">
                                🔓
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-slate-900 truncate">Next Unlock: {user.level === 'Starter' ? 'Rising' : user.level === 'Rising' ? 'Pro' : 'Elite'} Level</h4>
                                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <p className="text-[10px] text-slate-500 font-medium">Earn 300 more XP to unlock</p>
                                    <p className="text-[10px] text-blue-600 font-bold">60%</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat CTA */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                         <svg width="200" height="200" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="80" stroke="white" strokeWidth="40"/></svg>
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="font-bold text-2xl mb-2">Talk to Tangira Coach</h3>
                            <p className="text-slate-300 max-w-md text-sm md:text-base">Get instant help with your CV, gig proposals, or technical questions. Available 24/7.</p>
                        </div>
                        <button onClick={() => setChatOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 w-full md:w-auto text-sm">
                            Start Chatting
                        </button>
                    </div>
                </div>

                {/* Active Learning (Offline Ready) */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">My Courses</h3>
                        <button className="text-emerald-600 text-sm font-bold hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors">View Catalog</button>
                    </div>
                    <div className="grid gap-4">
                        {courses.map(course => (
                            <div key={course.id} className="group flex flex-col sm:flex-row gap-4 items-center p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md hover:border-emerald-100 transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                                    {course.category === 'Marketing' ? '📢' : course.category === 'Tech' ? '💻' : '📝'}
                                </div>
                                <div className="flex-1 w-full text-center sm:text-left">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
                                        {course.title}
                                        <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-medium flex items-center gap-1" title="Available Offline">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                            Offline
                                        </span>
                                    </h4>
                                    <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                                        <div className="w-full max-w-[120px] bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">{course.progress}%</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">+{course.xp} XP</span>
                                    {course.progress < 100 && (
                                        <button className="text-xs font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-900/10">Continue</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                             <div className="bg-amber-100 text-amber-600 p-1.5 rounded-lg text-sm">🏆</div>
                             <h3 className="font-bold text-slate-900 text-lg">Monthly Leaderboard</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Harare Cohort</span>
                    </div>
                    <div className="space-y-3">
                        {leaderboardData.map((item) => (
                            <div 
                                key={item.rank} 
                                className={`flex items-center p-3 rounded-2xl transition-all ${item.isUser ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'hover:bg-slate-50'}`}
                            >
                                <div className={`w-8 font-bold text-center text-sm ${item.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                                    #{item.rank}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mx-3 border border-indigo-100">
                                    {item.avatar}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-sm ${item.isUser ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {item.name} {item.isUser && '(You)'}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-medium">Data Analyst Track</p>
                                </div>
                                <div className="font-bold text-slate-900 text-sm px-3">{item.xp} XP</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
         {/* Chat Overlay */}
        {chatOpen && (
            <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-end md:items-center md:justify-center p-0 md:p-4 animate-in fade-in duration-200">
                <div className="bg-white w-full h-[90vh] md:max-w-md md:h-[600px] md:rounded-3xl rounded-t-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 overflow-hidden">
                    <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-lg shadow-sm">🤖</div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Tangira Coach</h3>
                                <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Online
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setChatOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors">✕</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && <div className="text-xs text-slate-400 ml-4 font-medium animate-pulse">Coach is typing...</div>}
                    </div>

                    <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                        <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask about gigs or CVs..." 
                            className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none text-slate-800 placeholder:text-slate-400"
                        />
                        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  }

  // ---------------- VIEW: FIND WORK ---------------- //
  if (activeView === 'find-work') {
      return (
        <div className="pt-28 pb-32 px-4 sm:px-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Opportunities</h1>
                    <p className="text-slate-500 mt-1 font-medium">Matched to your skill profile.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select className="bg-white border-0 shadow-sm ring-1 ring-slate-200 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-700 w-full md:w-auto">
                        <option>Best Match</option>
                        <option>Most Recent</option>
                        <option>Highest Budget</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {gigs.map(gig => {
                    const canApply = hasSkill(gig.skills);
                    const missingSkills = gig.skills.filter(s => !user.skills.includes(s));
                    const firstMissing = missingSkills[0];
                    const recommendedCourse = courses.find(c => c.unlocksSkill === firstMissing);

                    return (
                        <div key={gig.id} className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden group ${canApply ? 'shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-slate-100/50' : 'border border-slate-100 bg-slate-50/30'}`}>
                            
                            {!canApply && (
                                <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-4 py-2 rounded-bl-2xl flex items-center gap-1.5 z-10 border-b border-l border-slate-200">
                                    <span>🔒</span> Skill Locked
                                </div>
                            )}
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 pr-12 md:pr-0">
                                <div className="flex-1">
                                    <h3 className={`font-bold text-xl text-slate-900 mb-1 leading-tight ${canApply ? 'group-hover:text-emerald-600 transition-colors' : ''}`}>{gig.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                        <span>{gig.postedBy}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span>{gig.applicants || 0} applicants</span>
                                    </div>
                                </div>
                                <div className="hidden md:block bg-emerald-50 text-emerald-700 px-5 py-2 rounded-xl font-bold text-lg border border-emerald-100/50">
                                    ${gig.budget}
                                </div>
                            </div>

                            {/* Mobile Budget Pill */}
                            <div className="md:hidden inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg font-bold text-sm border border-emerald-100/50 mb-4">
                                ${gig.budget}
                            </div>
                            
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">{gig.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {gig.skills.map(skill => (
                                    <span key={skill} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border ${user.skills.includes(skill) ? 'bg-white text-slate-600 border-slate-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                        {skill}
                                    </span>
                                ))}
                                <span className="text-[11px] font-medium bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-100">{gig.difficulty}</span>
                                <span className="text-[11px] font-medium bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-100">{gig.duration}</span>
                            </div>

                            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                {canApply ? (
                                    <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5">
                                        Apply Now
                                    </button>
                                ) : (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                                        {recommendedCourse ? (
                                            <button 
                                                onClick={() => alert(`Starting course: ${recommendedCourse.title}`)}
                                                className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                                            >
                                                <span>🚀</span> Unlock with "{recommendedCourse.title}"
                                            </button>
                                        ) : (
                                            <button className="w-full sm:w-auto bg-slate-200 text-slate-500 px-6 py-3.5 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2">
                                                <span>🔒</span> Learn {firstMissing} to Unlock
                                            </button>
                                        )}
                                        {recommendedCourse && (
                                            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-lg text-center border border-amber-100">
                                                +{recommendedCourse.xp} XP Reward
                                            </span>
                                        )}
                                    </div>
                                )}
                                <button className="text-slate-400 hover:text-slate-600 p-2 hidden sm:block">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      );
  }

  // ---------------- VIEW: MY JOBS ---------------- //
  if (activeView === 'my-jobs') {
    return (
        <div className="pt-28 pb-32 px-4 bg-[#F8F9FB] min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🚧</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Active Jobs</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">You don't have any active contracts yet. Check out the Opportunities tab to find your first gig!</p>
                <button className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all hover:-translate-y-1">Find Work</button>
            </div>
        </div>
    );
  }

  return <div>Unknown View</div>;
};

export default LearnerDashboard;