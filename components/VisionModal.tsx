import React from 'react';

interface VisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisionModal: React.FC<VisionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Product Roadmap</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Prototype vs. Production</h2>
            <p className="text-slate-400 text-lg">This demo showcases the UX. Here is how the real Tangira ecosystem operates at scale.</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column 1: Current Prototype */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-400 border-b border-slate-100 pb-2">⚠️ Current Prototype (MVP)</h3>
            
            <div className="group bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-700 mb-1">Simulated Backend</div>
              <p className="text-sm text-slate-500">Data is stored locally in-memory. Refreshing the page resets user progress and gig posts.</p>
            </div>

            <div className="group bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-700 mb-1">Mock EcoCash</div>
              <p className="text-sm text-slate-500">Wallet transactions are visual only. No real funds are moved between merchant and learner accounts.</p>
            </div>

            <div className="group bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="font-bold text-slate-700 mb-1">Base Gemini AI</div>
              <p className="text-sm text-slate-500">Uses standard Gemini 2.5 Flash prompts without fine-tuning on specific local business datasets.</p>
            </div>
          </div>

          {/* Column 2: Production Vision */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-600 border-b border-emerald-100 pb-2">🚀 Production Release (V1.0)</h3>
            
            <div className="group bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">📱</span>
                <div className="font-bold text-slate-900">Native Android & USSD</div>
              </div>
              <p className="text-sm text-slate-600">Built with React Native for offline-first capabilities. USSD menus deployed via Econet for non-smartphone users.</p>
            </div>

            <div className="group bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">💳</span>
                <div className="font-bold text-slate-900">Live EcoCash Merchant API</div>
              </div>
              <p className="text-sm text-slate-600">Real-time disbursements using the EcoCash Open API. Smart contracts hold funds in escrow until gig approval.</p>
            </div>

            <div className="group bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🧠</span>
                <div className="font-bold text-slate-900">Econet Yamurai AI</div>
              </div>
              <p className="text-sm text-slate-600">Powered by Econet's Yamurai AI model, fine-tuned on 50,000+ local Shona/Ndebele phrases and Zimbabwean SME business contexts for superior accuracy.</p>
            </div>

             <div className="group bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🔗</span>
                <div className="font-bold text-slate-900">Akello & KYC Integration</div>
              </div>
              <p className="text-sm text-slate-600">Direct API sync with Akello LMS for real-time course progress. National ID verification for KYC compliance.</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
            <button 
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
            >
                Understood - Back to Demo
            </button>
        </div>
      </div>
    </div>
  );
};

export default VisionModal;