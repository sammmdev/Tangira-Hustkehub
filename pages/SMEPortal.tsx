import React, { useState } from 'react';
import { generateGigsFromDescription } from '../services/geminiService';
import { Gig } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SMEPortalProps {
    activeView?: 'sme-dashboard' | 'sme-create' | 'sme-talent';
    setActiveView: (view: string) => void;
    onPostGig: (gig: Gig) => void;
}

const SMEPortal: React.FC<SMEPortalProps> = ({ activeView = 'sme-dashboard', setActiveView, onPostGig }) => {
  // -- Task Shaper State --
  const [taskDescription, setTaskDescription] = useState('');
  const [inputLanguage, setInputLanguage] = useState('English');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedGigs, setGeneratedGigs] = useState<Gig[]>([]);
  const [step, setStep] = useState<'input' | 'review'>('input');

  // -- Dashboard Filter State --
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // -- Talent Pool State --
  const [talentSkillFilter, setTalentSkillFilter] = useState('All');
  const [talentRatingFilter, setTalentRatingFilter] = useState('All');

  // -- Mock Data for Analytics --
  const spendingData = [
    { name: 'Week 1', amount: 45 },
    { name: 'Week 2', amount: 120 },
    { name: 'Week 3', amount: 80 },
    { name: 'Week 4', amount: 150 },
  ];

  const categoryData = [
    { name: 'Admin', value: 45, color: '#10b981' }, 
    { name: 'Design', value: 30, color: '#3b82f6' }, 
    { name: 'Social', value: 15, color: '#8b5cf6' }, 
    { name: 'Data', value: 10, color: '#f59e0b' },   
  ];

  const activePostings = [
      { id: 'p1', title: 'Data Entry for Receipt Log', proposals: 5, budget: 15, status: 'Active', category: 'Admin' },
      { id: 'p2', title: 'Facebook Banner Design', proposals: 2, budget: 10, status: 'Active', category: 'Design' },
      { id: 'p3', title: 'Instagram Reels Edit', proposals: 8, budget: 25, status: 'Reviewing', category: 'Social' }
  ];

  const talentPoolData = [
    { id: 't1', name: 'Nyasha T.', role: 'Data Assistant', avgRating: 4.9, completionRate: 100, totalEarnings: 120, skills: ['Excel', 'Data Entry'], lastActive: '2 days ago' },
    { id: 't2', name: 'Farai M.', role: 'Graphic Designer', avgRating: 4.7, completionRate: 95, totalEarnings: 350, skills: ['Canva', 'Design'], lastActive: '1 week ago' },
    { id: 't3', name: 'Blessing K.', role: 'Virtual Assistant', avgRating: 4.2, completionRate: 88, totalEarnings: 85, skills: ['Admin', 'Email'], lastActive: '3 days ago' },
    { id: 't4', name: 'Tariro M.', role: 'Translator', avgRating: 5.0, completionRate: 100, totalEarnings: 45, skills: ['Shona', 'Transcription'], lastActive: 'Yesterday' },
    { id: 't5', name: 'Kudzai C.', role: 'Social Media', avgRating: 4.5, completionRate: 92, totalEarnings: 210, skills: ['Social Media', 'Content'], lastActive: '5 days ago' },
  ];

  const filteredPostings = categoryFilter === 'All' 
    ? activePostings 
    : activePostings.filter(p => p.category === categoryFilter);

  const filteredTalent = talentPoolData.filter(t => {
      const skillMatch = talentSkillFilter === 'All' || t.skills.some(s => s.includes(talentSkillFilter) || t.role.includes(talentSkillFilter));
      const ratingMatch = talentRatingFilter === 'All' ? true : t.avgRating >= parseFloat(talentRatingFilter);
      return skillMatch && ratingMatch;
  });

  const handleShapeTask = async () => {
    if (!taskDescription.trim()) return;
    setIsProcessing(true);
    const gigs = await generateGigsFromDescription(taskDescription, inputLanguage);
    setGeneratedGigs(gigs);
    setIsProcessing(false);
    setStep('review');
  };

  const handleApprove = (id: string) => {
    // Find the gig from the generated list
    const gigToPost = generatedGigs.find(g => g.id === id);
    
    if (gigToPost) {
        // Prepare final gig object with SME details
        const finalGig: Gig = {
            ...gigToPost,
            postedBy: 'Harare Fresh Veggies', // Mock SME Name
            applicants: 0,
            status: 'Open'
        };
        
        onPostGig(finalGig);
        alert(`Gig "${finalGig.title}" approved and posted to marketplace!`);
        
        // Reset Flow
        setActiveView('sme-dashboard');
        setStep('input');
        setTaskDescription('');
        setGeneratedGigs([]);
    }
  };

  // ---------------- VIEW: DASHBOARD ---------------- //
  if (activeView === 'sme-dashboard') {
      return (
          <div className="pt-28 pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
              
              {/* Header */}
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                  <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                            🛡️ Verified Trust Score: 98/100
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1">Overview for <span className="font-semibold text-slate-900">Harare Fresh Veggies</span></p>
                  </div>
                  <button onClick={() => setActiveView('sme-create')} className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                      <span>✨</span> New AI Task
                  </button>
              </header>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {[
                      { label: 'Total Spend', value: '$395.00', trend: '↑ 12%', trendColor: 'text-emerald-600 bg-emerald-50' },
                      { label: 'Active Jobs', value: '3', trend: '', trendColor: '' },
                      { label: 'New Proposals', value: '15', trend: 'New', trendColor: 'text-blue-600 bg-blue-50' },
                      { label: 'Avg Rating', value: '4.8', sub: '/ 5.0', trend: '', trendColor: '' }
                  ].map((kpi, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50">
                          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{kpi.label}</h3>
                          <div className="flex items-end gap-2">
                              <p className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</p>
                              {kpi.sub && <span className="text-slate-400 text-sm font-bold mb-1">{kpi.sub}</span>}
                              {kpi.trend && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${kpi.trendColor}`}>{kpi.trend}</span>}
                          </div>
                      </div>
                  ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left: Charts Column */}
                  <div className="lg:col-span-2 space-y-8">
                        {/* Spending Chart */}
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-slate-900 text-lg">Spending Trend</h3>
                                <select 
                                    value={timeRange} 
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="bg-slate-50 border-0 text-sm font-bold rounded-lg px-3 py-2 text-slate-600 outline-none focus:ring-2 focus:ring-slate-200"
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last Quarter</option>
                                </select>
                            </div>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={spendingData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} tickFormatter={(val) => `$${val}`} />
                                        <Tooltip 
                                            cursor={{fill: '#f8fafc'}}
                                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                                        />
                                        <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* Active Jobs Table */}
                        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 text-lg">Recent Postings</h3>
                                <select 
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="bg-slate-50 border-0 text-sm font-bold rounded-lg px-3 py-2 text-slate-600 outline-none focus:ring-2 focus:ring-slate-200"
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Design">Design</option>
                                </select>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title</th>
                                            <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Proposals</th>
                                            <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Budget</th>
                                            <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredPostings.map(post => (
                                            <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-5">
                                                    <div className="font-bold text-slate-900">{post.title}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{post.category}</div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex -space-x-2">
                                                        {[...Array(Math.min(3, post.proposals))].map((_, i) => (
                                                            <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                                {String.fromCharCode(65+i)}
                                                            </div>
                                                        ))}
                                                        {post.proposals > 3 && (
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                                +{post.proposals - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-5 text-slate-900 font-bold">${post.budget}</td>
                                                <td className="p-5">
                                                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${post.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                  </div>

                  {/* Right: Insights Column */}
                  <div className="lg:col-span-1 space-y-8">
                        {/* Breakdown */}
                        <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50">
                            <h3 className="font-bold text-slate-900 mb-6">Spend Breakdown</h3>
                            <div className="h-48 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                            cornerRadius={6}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Total</div>
                                        <div className="text-xl font-bold text-slate-900">$395</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                {categoryData.map(c => (
                                    <div key={c.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: c.color}}></div>
                                            <span className="text-slate-600 font-medium">{c.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-900">{c.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                  </div>
              </div>

               {/* New Section: Talent Pool Performance */}
               <div className="mt-8 bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Talent Pool Performance</h3>
                            <p className="text-slate-500 text-xs mt-0.5">Learners who have completed work for you</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                            <select 
                                value={talentSkillFilter}
                                onChange={(e) => setTalentSkillFilter(e.target.value)}
                                className="bg-slate-50 border-0 text-sm font-bold rounded-lg px-3 py-2 text-slate-600 outline-none focus:ring-2 focus:ring-slate-200"
                            >
                                <option value="All">All Skills</option>
                                <option value="Excel">Excel</option>
                                <option value="Design">Design</option>
                                <option value="Shona">Shona</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <select 
                                value={talentRatingFilter}
                                onChange={(e) => setTalentRatingFilter(e.target.value)}
                                className="bg-slate-50 border-0 text-sm font-bold rounded-lg px-3 py-2 text-slate-600 outline-none focus:ring-2 focus:ring-slate-200"
                            >
                                <option value="All">All Ratings</option>
                                <option value="4.5">4.5+ Stars</option>
                                <option value="4.0">4.0+ Stars</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Learner</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Rating</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Completion Rate</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Earnings</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Top Skills</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredTalent.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                                            No talent found matching your filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTalent.map((talent) => (
                                        <tr key={talent.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                                        {talent.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 text-sm">{talent.name}</div>
                                                        <div className="text-xs text-slate-500">{talent.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-amber-500 text-sm">★</span>
                                                    <span className="font-bold text-slate-700 text-sm">{talent.avgRating.toFixed(1)}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-100 rounded-full h-1.5">
                                                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${talent.completionRate}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-600">{talent.completionRate}%</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-slate-900 font-bold text-sm">
                                                ${talent.totalEarnings}
                                            </td>
                                            <td className="p-5">
                                                <div className="flex gap-1.5">
                                                    {talent.skills.map(skill => (
                                                        <span key={skill} className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
          </div>
      );
  }

  // ---------------- VIEW: AI TASK SHAPER ---------------- //
  return (
    <div className="pt-28 pb-32 px-4 min-h-screen bg-[#F8F9FB] max-w-3xl mx-auto">
        <div className="mb-10 text-center px-4">
            <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">AI Task Shaper</h1>
            <p className="text-slate-500 max-w-lg mx-auto">Don't stress about job descriptions. Just tell us what you need in plain English (or Shona), and we'll structure it for you.</p>
        </div>

        {step === 'input' && (
            <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 p-6 md:p-8">
                    <div className="flex justify-between items-center mb-4 ml-1">
                        <label className="block text-sm font-bold text-slate-900">
                            Describe your task
                        </label>
                        <select 
                            value={inputLanguage}
                            onChange={(e) => setInputLanguage(e.target.value)}
                            className="text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="English">🇬🇧 English</option>
                            <option value="Shona">🇿🇼 Shona</option>
                            <option value="Ndebele">🇿🇼 Ndebele</option>
                        </select>
                    </div>
                    <div className="relative mb-6">
                        <textarea 
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none min-h-[200px] resize-none text-slate-800 text-lg leading-relaxed placeholder:text-slate-300 transition-all"
                            placeholder={inputLanguage === 'English' ? "e.g., I have 50 handwritten receipts that I need typed into an Excel sheet. I need it done by Friday." : "Semuenzaniso, ndine marisiti makumi mashanu akanyorwa nemaoko..."}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <button className="absolute bottom-4 right-4 text-slate-400 hover:text-emerald-600 bg-white p-2 rounded-xl shadow-sm border border-slate-100 transition-colors" title="Voice Input">
                        🎤
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <button onClick={() => setActiveView('sme-dashboard')} className="text-slate-500 font-bold hover:text-slate-900 transition-colors text-sm">Cancel</button>
                        <button 
                            onClick={handleShapeTask}
                            disabled={isProcessing || !taskDescription}
                            className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${isProcessing ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/30 hover:-translate-y-0.5'}`}
                        >
                            {isProcessing ? 'Processing...' : 'Shape My Task ✨'}
                        </button>
                    </div>
                </div>

                {/* WhatsApp Integration Card */}
                <div className="bg-[#DCF8C6]/30 border border-[#25D366]/20 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#25D366]/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-slate-800 text-lg">In a rush? Use WhatsApp.</h3>
                        <p className="text-slate-600 text-sm mt-1 max-w-sm">Save <span className="font-bold text-slate-900">+263 77 123 4567</span> and send a voice note to post jobs instantly while on the go.</p>
                    </div>
                    <button className="bg-white text-[#075E54] border border-[#25D366] px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#DCF8C6] transition-colors whitespace-nowrap">
                        Connect Account
                    </button>
                </div>
            </div>
        )}

        {step === 'review' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-bold text-slate-800">Review Suggestions</h2>
                    <button onClick={() => setStep('input')} className="text-sm font-bold text-slate-500 hover:text-emerald-600">Edit Input</button>
                </div>

                {generatedGigs.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-slate-300">
                         <p className="text-slate-500">AI couldn't generate tasks. Please try again with more detail.</p>
                    </div>
                ) : (
                    generatedGigs.map((gig, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{gig.title}</h3>
                                    <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-xl text-lg font-bold border border-emerald-100 self-start sm:self-auto">${gig.budget}</span>
                                </div>
                                
                                <p className="text-slate-600 mb-8 leading-relaxed">{gig.description}</p>
                                
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        ⏱ {gig.duration}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        📊 {gig.difficulty}
                                    </div>
                                    {gig.skills.map(skill => (
                                        <span key={skill} className="text-sm font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={() => handleApprove(gig.id)}
                                        className="flex-1 bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                    >
                                        Approve & Post
                                    </button>
                                    <button className="px-6 py-3.5 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}
    </div>
  );
};

export default SMEPortal;