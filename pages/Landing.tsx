import React, { useState } from 'react';
import { UserRole } from '../types';

interface LandingProps {
  onGetStarted: (role: UserRole) => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  const [viewRole, setViewRole] = useState<'talent' | 'business'>('talent');

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 pt-28 pb-0 overflow-x-hidden font-sans">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-[100px] opacity-50"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col items-center text-center">
          
          {/* Role Toggle Pill */}
          <div className="bg-white p-1.5 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] mb-8 inline-flex">
            <button 
              onClick={() => setViewRole('talent')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${viewRole === 'talent' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              For Youth
            </button>
            <button 
              onClick={() => setViewRole('business')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${viewRole === 'business' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              For Business
            </button>
          </div>

          <h1 className="text-4xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-5xl leading-[1.1] md:leading-[0.95]">
            {viewRole === 'talent' ? (
              <>
                Learn Skills. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">Get Paid.</span>
              </>
            ) : (
              <>
                Hire Verified <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Junior Talent.</span>
              </>
            )}
          </h1>
          
          <p className="mt-4 text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            {viewRole === 'talent' 
              ? "Tangira turns your learning into earning. Build your Skills Credit Score and get paid instantly via EcoCash."
              : "Access a vetted pool of Zimbabwean youth ready for micro-tasks. AI-scoped, performance-tracked, and affordable."
            }
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0">
            <button 
              onClick={() => onGetStarted(viewRole === 'talent' ? UserRole.LEARNER : UserRole.SME)}
              className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-lg text-white shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300 ${viewRole === 'talent' ? 'bg-emerald-600' : 'bg-blue-600 shadow-blue-500/30'}`}
            >
              {viewRole === 'talent' ? 'Start Earning Now →' : 'Post a Job for Free →'}
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 border border-slate-100/50">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300 ${viewRole === 'talent' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
              {viewRole === 'talent' ? '📈' : '🤖'}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
              {viewRole === 'talent' ? 'Skills Credit Score' : 'AI Task Shaper'}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              {viewRole === 'talent' 
                ? "Your reliability is your currency. Every course completed and gig delivered builds your score, unlocking better pay."
                : "Don't know how to write a job post? Just send a voice note. Our AI breaks it down into clear, manageable micro-gigs."
              }
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 border border-slate-100/50">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300 ${viewRole === 'talent' ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-indigo-500'}`}>
              {viewRole === 'talent' ? '🎓' : '⚡'}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
              {viewRole === 'talent' ? 'Learn to Unlock' : 'Instant Matching'}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              {viewRole === 'talent' 
                ? "See a high-paying gig you can't access? The app tells you exactly which micro-course to take to unlock it."
                : "We match your task with learners who have the exact verified skills needed. No sifting through hundreds of CVs."
              }
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 border border-slate-100/50">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300 ${viewRole === 'talent' ? 'bg-purple-50 text-purple-500' : 'bg-violet-50 text-violet-500'}`}>
              💰
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
              {viewRole === 'talent' ? 'EcoCash Wallet' : 'Seamless Payouts'}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              {viewRole === 'talent' 
                ? "Get paid instantly for every micro-gig. Save, cash out, or buy data bundles directly within the Tangira app."
                : "Pay for results. Fund your wallet via EcoCash or Bank Transfer and release funds only when the work is approved."
              }
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Integration Section */}
      <div className="relative bg-[#004d40] py-24 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
             <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Text Content */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-700/50 px-4 py-2 rounded-full mb-6">
                        <span className="text-[#25D366] text-xl">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </span>
                        <span className="text-emerald-100 font-bold text-sm tracking-wide">NEW: WHATSAPP INTEGRATION</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Post Jobs & Learn <br/>
                        <span className="text-[#25D366]">Where You Are.</span>
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 leading-relaxed max-w-xl">
                        No data? No problem. Use our WhatsApp Bot to post micro-gigs via voice note or complete learning modules. We've also added USSD support for basic quizzes.
                    </p>
                    
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 flex items-center justify-center text-2xl">🎙️</div>
                            <div>
                                <h3 className="font-bold text-white text-lg">SMEs: Voice Note to Job Post</h3>
                                <p className="text-emerald-200/80 text-sm">"I need a logo for my farm." -> AI posts the gig instantly.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 flex items-center justify-center text-2xl">📚</div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Youth: Learn on WhatsApp</h3>
                                <p className="text-emerald-200/80 text-sm">Access 5-minute micro-lessons and quizzes with minimal data usage.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <button className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-[#25D366]/20 hover:bg-[#1da851] transition-all hover:-translate-y-1">
                            <span>Try the WhatsApp Bot</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>

                {/* Phone Mockup */}
                <div className="relative mx-auto lg:mr-0 w-[300px] h-[600px] bg-slate-900 rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-hidden">
                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#E5DDD5] relative flex flex-col">
                        {/* Header */}
                        <div className="bg-[#075E54] p-4 text-white flex items-center gap-3 pt-8">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">T</div>
                            <div>
                                <h4 className="font-bold text-sm">Tangira Bot ✅</h4>
                                <p className="text-[10px] text-emerald-100">Online</p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 space-y-4 overflow-hidden relative">
                             {/* Message 1 */}
                             <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] text-slate-800 p-3 rounded-lg rounded-tr-none text-xs shadow-sm max-w-[80%]">
                                    I need someone to type 20 pages of handwritten notes into Word.
                                    <div className="text-[9px] text-slate-500 text-right mt-1">10:42 AM</div>
                                </div>
                             </div>

                             {/* Message 2 */}
                             <div className="flex justify-start">
                                <div className="bg-white text-slate-800 p-3 rounded-lg rounded-tl-none text-xs shadow-sm max-w-[85%]">
                                    I can help with that! <br/><br/>
                                    <strong>Draft Job:</strong> Data Entry<br/>
                                    <strong>Skills:</strong> Typing, Word<br/>
                                    <strong>Est. Budget:</strong> $10 - $20<br/>
                                    <br/>
                                    Should I post this to the 'Admin' talent pool?
                                    <div className="text-[9px] text-slate-400 text-right mt-1">10:42 AM</div>
                                </div>
                             </div>

                              {/* Message 3 */}
                              <div className="flex justify-end">
                                <div className="bg-[#DCF8C6] text-slate-800 p-3 rounded-lg rounded-tr-none text-xs shadow-sm max-w-[80%]">
                                    Yes, budget $15.
                                    <div className="text-[9px] text-slate-500 text-right mt-1">10:43 AM</div>
                                </div>
                             </div>

                             {/* Message 4 */}
                             <div className="flex justify-start">
                                <div className="bg-white text-slate-800 p-3 rounded-lg rounded-tl-none text-xs shadow-sm max-w-[85%]">
                                    ✅ <strong>Posted Successfully!</strong><br/>
                                    I've notified 5 qualified learners. I'll alert you when they apply.
                                    <div className="text-[9px] text-slate-400 text-right mt-1">10:43 AM</div>
                                </div>
                             </div>
                        </div>

                        {/* Input Area */}
                        <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
                            <div className="flex-1 bg-white rounded-full h-8 px-3 text-xs flex items-center text-slate-400">Type a message...</div>
                            <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center text-white text-xs">🎤</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;