import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import LearnerDashboard from './pages/LearnerDashboard';
import SMEPortal from './pages/SMEPortal';
import Wallet from './pages/Wallet';
import VisionModal from './components/VisionModal';
import { UserRole, User, Gig } from './types';

// Mock User Data
const mockLearner: User = {
  id: 'u1',
  name: 'Tariro Moyo',
  role: UserRole.LEARNER,
  avatar: '', // Empty will default to Initials
  walletBalance: 24.50,
  tokens: 1850,
  level: 'Rising',
  skills: ['Shona', 'Transcription', 'Data Entry'], // User has these skills
  skillScore: {
    reliability: 85,
    technical: 60,
    communication: 75,
    speed: 90,
    endorsements: 40,
    total: 720
  },
  badges: [
    { id: 'b1', name: 'First Gig', icon: '🚀', description: 'Completed your first paid gig', unlocked: true },
    { id: 'b2', name: 'Fast Learner', icon: '⚡', description: 'Finished a course in record time', unlocked: true },
    { id: 'b3', name: 'Top Rated', icon: '⭐', description: 'Received a 5-star rating', unlocked: false },
    { id: 'b4', name: 'Streaker', icon: '🔥', description: 'Logged in 7 days in a row', unlocked: false },
  ]
};

const mockSME: User = {
  id: 'u2',
  name: 'Harare Fresh Veggies',
  role: UserRole.SME,
  avatar: '',
  walletBalance: 150.00,
  tokens: 0,
  level: 'Starter', // Not used for SME
  skills: []
};

// Initial Mock Gigs
const initialGigs: Gig[] = [
    { id: 'g1', title: 'Transcribe 10min Audio', description: 'English to Shona transcription needed for a local NGO interview.', budget: 5, skills: ['Transcription', 'Shona'], duration: '1h', difficulty: 'Beginner', status: 'Open', postedBy: 'Harare NGO', applicants: 12 },
    { id: 'g2', title: 'Excel Clean-up', description: 'Format a customer list of 50 rows. Remove duplicates and fix capitalization.', budget: 10, skills: ['Excel'], duration: '2h', difficulty: 'Intermediate', status: 'Open', postedBy: 'Fresh Veggies Ltd', applicants: 4 },
    { id: 'g3', title: 'Social Media Manager (Week)', description: 'Create 3 posts for our Facebook page about our new winter collection.', budget: 35, skills: ['Social Media', 'Canva'], duration: '1 week', difficulty: 'Intermediate', status: 'Open', postedBy: 'Fashion Hub', applicants: 8 },
    { id: 'g4', title: 'AI Data Labeling', description: 'Label 100 images of Zimbabwean street signs for an AI project.', budget: 15, skills: ['AI Prompting'], duration: '3h', difficulty: 'Beginner', status: 'Open', postedBy: 'TechZim AI', applicants: 20 },
  ];

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.GUEST);
  const [activeTab, setActiveTab] = useState('landing');
  const [currentUser, setCurrentUser] = useState<User>(mockLearner);
  const [gigs, setGigs] = useState<Gig[]>(initialGigs);
  const [showVisionModal, setShowVisionModal] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === UserRole.LEARNER) {
        setCurrentUser(mockLearner);
        setActiveTab('dashboard'); // Default to Hub
    } else if (role === UserRole.SME) {
        setCurrentUser(mockSME);
        setActiveTab('sme-dashboard'); // Default to Dashboard
    } else {
        setActiveTab('landing');
    }
  };

  const handlePostGig = (newGig: Gig) => {
    // Add new gig to the beginning of the list
    setGigs(prevGigs => [newGig, ...prevGigs]);
  };

  // Render Page Content based on activeTab
  const renderContent = () => {
    if (activeTab === 'landing') {
        return <Landing onGetStarted={handleRoleChange} />;
    }

    // Learner Routes
    if (currentRole === UserRole.LEARNER) {
        switch (activeTab) {
            case 'dashboard': return <LearnerDashboard user={currentUser} gigs={gigs} activeView="hub" />;
            case 'find-work': return <LearnerDashboard user={currentUser} gigs={gigs} activeView="find-work" />;
            case 'my-jobs': return <LearnerDashboard user={currentUser} gigs={gigs} activeView="my-jobs" />;
            case 'learn': return <LearnerDashboard user={currentUser} gigs={gigs} activeView="hub" />; // Simplified for prototype
            case 'wallet': return <Wallet user={currentUser} />;
            default: return <LearnerDashboard user={currentUser} gigs={gigs} activeView="hub" />;
        }
    }

    // SME Routes
    if (currentRole === UserRole.SME) {
        switch (activeTab) {
            case 'sme-dashboard': return <SMEPortal activeView="sme-dashboard" setActiveView={setActiveTab} onPostGig={handlePostGig} />;
            case 'sme-create': return <SMEPortal activeView="sme-create" setActiveView={setActiveTab} onPostGig={handlePostGig} />;
            case 'sme-talent': return <div className="pt-24 text-center">Talent Search Coming Soon</div>;
            case 'wallet': return <Wallet user={currentUser} />;
            default: return <SMEPortal activeView="sme-dashboard" setActiveView={setActiveTab} onPostGig={handlePostGig} />;
        }
    }

    return <Landing onGetStarted={handleRoleChange} />;
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* Prototype Banner */}
      <div className="bg-slate-900 text-white text-xs font-bold py-2 px-4 text-center relative z-[60] flex items-center justify-center gap-3">
        <span className="opacity-80">🚧 Tangira Interactive Prototype</span>
        <button 
            onClick={() => setShowVisionModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-0.5 rounded-full transition-colors text-[10px] uppercase tracking-wider"
        >
            View Real App Vision
        </button>
      </div>

      <VisionModal isOpen={showVisionModal} onClose={() => setShowVisionModal(false)} />

      {activeTab !== 'landing' && (
        <NavBar 
            currentRole={currentRole} 
            setCurrentRole={handleRoleChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
      )}
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;