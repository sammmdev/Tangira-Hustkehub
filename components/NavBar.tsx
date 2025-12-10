import React from 'react';
import { UserRole } from '../types';

interface NavBarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentRole, setCurrentRole, activeTab, setActiveTab }) => {
  
  // SVG Icons
  const Icons = {
    Home: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
    Briefcase: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
    Wallet: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>,
    Chart: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    Plus: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
    Lightning: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    Jobs: (props: any) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
  };

  const learnerTabs = [
    { id: 'dashboard', label: 'Hub', Icon: Icons.Home },
    { id: 'find-work', label: 'Opportunities', Icon: Icons.Lightning },
    { id: 'my-jobs', label: 'My Jobs', Icon: Icons.Jobs },
    { id: 'wallet', label: 'Wallet', Icon: Icons.Wallet },
  ];

  const smeTabs = [
    { id: 'sme-dashboard', label: 'Overview', Icon: Icons.Chart },
    { id: 'sme-create', label: 'Post Gig', Icon: Icons.Plus },
    { id: 'wallet', label: 'Finance', Icon: Icons.Wallet },
  ];

  const tabs = currentRole === UserRole.SME ? smeTabs : learnerTabs;

  return (
    <>
      {/* Desktop Top Bar - Floating Capsule */}
      <nav className="fixed top-0 w-full z-50 px-4 pt-6 pointer-events-none hidden md:block">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-full px-8 py-3.5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/50 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('landing')}>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform rotate-3">
                T
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">Tangira</span>
            </div>

            {/* Center Tabs */}
            <div className="flex items-center bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200/50' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <tab.Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Role Switcher */}
            <div className="flex gap-4 items-center">
              <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
                <button 
                  onClick={() => setCurrentRole(UserRole.LEARNER)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${currentRole === UserRole.LEARNER ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Youth
                </button>
                <button 
                  onClick={() => setCurrentRole(UserRole.SME)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${currentRole === UserRole.SME ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  SME
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Bar - Floating Dock */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] p-2">
          <div className="flex justify-around items-center">
            {tabs.map(tab => {
               const isActive = activeTab === tab.id;
               return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-center justify-center w-full py-3 space-y-1 transition-all rounded-2xl group ${
                    isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-1 w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  )}
                  <span className={`transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                    <tab.Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                  </span>
                  <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 absolute'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;