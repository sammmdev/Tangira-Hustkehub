import React from 'react';
import { User } from '../types';

interface WalletProps {
    user: User;
}

const Wallet: React.FC<WalletProps> = ({ user }) => {
    return (
        <div className="pt-28 pb-24 px-4 bg-[#F8F9FB] min-h-screen max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Financial Hub</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* EcoCash Card */}
                <div className="bg-gradient-to-br from-[#0055A5] to-[#003870] rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden h-[260px] flex flex-col justify-between group transform transition-transform hover:scale-[1.02]">
                    {/* Decorative Patterns */}
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                             <span className="font-bold text-xs tracking-widest uppercase text-blue-100">EcoCash Linked</span>
                        </div>
                        <svg className="w-10 h-10 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M13 16h-2v2h2v-2zm-2-8h-2v6h2V8zm-1-6C4.48 2 2 4.48 2 10s2.48 8 8 8 8-2.48 8-8-2.48-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
                    </div>

                    <div className="relative z-10">
                        <p className="text-blue-200 text-sm font-medium mb-1">Available Balance</p>
                        <h2 className="text-5xl font-bold tracking-tight mb-2">${user.walletBalance.toFixed(2)}</h2>
                        <p className="text-blue-200/60 text-xs font-mono tracking-widest">**** **** **** 4291</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-4 justify-center">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                            ⬇️
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Cash Out</h3>
                            <p className="text-xs text-slate-500">Transfer to EcoCash mobile</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                            ⚡
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Buy Data</h3>
                            <p className="text-xs text-slate-500">Instant bundles for Econet</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 text-lg">Recent Activity</h3>
                    <button className="text-slate-400 text-sm font-bold hover:text-slate-900 transition-colors">View All</button>
                </div>
                
                <div className="divide-y divide-slate-50">
                    {[
                        { title: 'Gig Payment: Transcription', date: 'Today, 10:23 AM', amount: '+$5.00', color: 'emerald', icon: '💰' },
                        { title: 'Data Bundle (Daily)', date: 'Yesterday, 4:15 PM', amount: '-$1.20', color: 'slate', icon: '⚡' },
                        { title: 'Gig Payment: Data Entry', date: 'Oct 24, 09:00 AM', amount: '+$10.00', color: 'emerald', icon: '💰' }
                    ].map((tx, i) => (
                        <div key={i} className="p-6 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${tx.color === 'emerald' ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                                    {tx.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{tx.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">{tx.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-lg ${tx.color === 'emerald' ? 'text-emerald-600' : 'text-slate-900'}`}>{tx.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;