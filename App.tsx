
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AIConsultant from './pages/AIConsultant';
import Marketplace from './pages/Marketplace';
import Professors from './pages/Professors';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import AcademicRoadmap from './pages/AcademicRoadmap';
import Research from './pages/Research';
import FreshmenGuide from './pages/FreshmenGuide';
import Services from './pages/Services';
import Innovation from './pages/Innovation';
import CityGuide from './pages/CityGuide';
import Community from './pages/Community';
import Library from './pages/Library';
import Booking from './pages/Booking';
import Tools from './pages/Tools';
import DailySchedule from './pages/DailySchedule';
import StudyTools from './pages/StudyTools';
import GameCenter from './pages/GameCenter';
import ResumeBuilder from './pages/ResumeBuilder';
import QuestionBank from './pages/QuestionBank';
import SoftSkills from './pages/SoftSkills';
import Cooking from './pages/Cooking';
import ThesisGuide from './pages/ThesisGuide';
import PodcastStudio from './pages/PodcastStudio';
import SmartStudy from './pages/SmartStudy';
import Notebook from './pages/Notebook';
import CourseSelection from './pages/CourseSelection';
import { UserProfile, UserTier } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock auto-login for demo purposes
  useEffect(() => {
    // For demo, we are NOT auto-logging in to show the Login page changes
    // unless a session exists (simulated). 
    /*
    const mockUser: UserProfile = {
      id: '1',
      name: 'آرمان دانش‌پژوه',
      studentId: '98123456',
      major: 'مهندسی کامپیوتر',
      entryYear: 1398,
      avatar: 'https://picsum.photos/seed/student/200',
      walletBalance: 250000,
      tier: UserTier.STUDENT,
      skills: ['React', 'Python', 'UI Design'],
      bio: 'عاشق برنامه‌نویسی و هوش مصنوعی. در حال یادگیری React و توسعه اپلیکیشن‌های وب. همیشه آماده همکاری در پروژه‌های گروهی!',
      xp: 1450,
      level: 3
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    */
  }, []);

  const handleLogin = (studentId: string) => {
    // Mock login logic
    const mockUser: UserProfile = {
      id: '1',
      name: 'آرمان دانش‌پژوه',
      studentId: studentId,
      major: 'مهندسی کامپیوتر',
      entryYear: 1398,
      avatar: 'https://picsum.photos/seed/student/200',
      walletBalance: 250000,
      tier: UserTier.ADMIN, // Set as admin for demo access
      skills: ['React', 'Python', 'UI Design'],
      bio: 'عاشق برنامه‌نویسی و هوش مصنوعی. در حال یادگیری React و توسعه اپلیکیشن‌های وب. همیشه آماده همکاری در پروژه‌های گروهی!',
      xp: 1450,
      level: 3
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <Layout user={user!} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Dashboard user={user!} />} />
            <Route path="/profile" element={<Profile user={user!} />} />
            <Route path="/schedule" element={<DailySchedule />} />
            <Route path="/library" element={<Library />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/services" element={<Services />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/city-guide" element={<CityGuide />} />
            <Route path="/community" element={<Community />} />
            <Route path="/roadmap" element={<AcademicRoadmap />} />
            <Route path="/research" element={<Research />} />
            <Route path="/freshmen" element={<FreshmenGuide />} />
            <Route path="/ai-consultant" element={<AIConsultant />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/professors" element={<Professors />} />
            <Route path="/study-tools" element={<StudyTools />} />
            <Route path="/games" element={<GameCenter />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/soft-skills" element={<SoftSkills />} />
            <Route path="/cooking" element={<Cooking />} />
            <Route path="/thesis" element={<ThesisGuide />} />
            <Route path="/podcast" element={<PodcastStudio />} />
            <Route path="/smart-study" element={<SmartStudy />} />
            <Route path="/notebook" element={<Notebook />} />
            <Route path="/course-selection" element={<CourseSelection />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
};

export default App;
