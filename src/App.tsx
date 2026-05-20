/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, Library, PlusCircle, Heart, User, Search, Bell, Music, Calendar, FileText, BarChart2, Mic, Megaphone, CalendarDays, BookOpen, Play } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import SheetMusicList from './components/SheetMusicList';
import PdfViewer from './components/PdfViewer';
import ChordChartViewer from './components/ChordChartViewer';
import { Song } from './lib/db';
import { seedSongs } from './lib/seed';
import { auth } from './lib/firebase';
import { signInAnonymously } from 'firebase/auth';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentView, setCurrentView] = useState('menu');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  useEffect(() => {
    async function initApp() {
      try {
        await signInAnonymously(auth);
        await seedSongs();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize app:", error);
        setIsInitialized(true);
      }
    }
    initApp();
  }, []);

  const menuItems = [
    { title: 'Sheet Music', icon: FileText, color: 'text-blue-600', action: () => setCurrentView('sheetMusic') },
    { title: 'Charts', icon: BarChart2, color: 'text-orange-500' },
    { title: 'Tuner & Tools', icon: Mic, color: 'text-teal-500' },
    { title: 'Announcements', icon: Megaphone, color: 'text-red-500' },
    { title: 'Calendar', icon: CalendarDays, color: 'text-purple-600' },
    { title: 'Devotionals', icon: BookOpen, color: 'text-indigo-600' },
  ];

  if (!isInitialized) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (currentView === 'sheetMusic') {
      return <SheetMusicList onSongClick={(song) => {
          setSelectedSong(song);
          setCurrentView('viewer');
      }} />;
  }

  if (currentView === 'viewer' && selectedSong) {
      if (selectedSong.chords) {
          return <ChordChartViewer 
              title={selectedSong.title}
              artist={selectedSong.artist}
              initialChords={selectedSong.chords}
              onBack={() => setCurrentView('sheetMusic')}
          />
      }
      return <PdfViewer 
          title={selectedSong.title} 
          pdfUrl={selectedSong.pdfUrl || ''} 
          onBack={() => setCurrentView('sheetMusic')} 
      />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-emerald-400 to-orange-300 text-gray-900 p-4 pb-24 font-sans">
      <header className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-3xl font-bold tracking-tight">Main Menu</h1>
        <button className="p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors">
          <Bell size={20} />
        </button>
      </header>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all" 
        />
      </div>

      <section className="grid grid-cols-2 gap-4 mb-8">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={item.action}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-4 aspect-square"
          >
            <item.icon size={40} className={`${item.color}`} />
            <span className="font-semibold text-sm">{item.title}</span>
          </motion.button>
        ))}
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex justify-between px-8 text-gray-400">
        <button onClick={() => setCurrentView('menu')} className="text-blue-600"><Home size={24} /></button>
        <button onClick={() => setCurrentView('sheetMusic')}><Library size={24} /></button>
        <button className="bg-blue-600 text-white p-3 rounded-full -mt-8 shadow-xl"><Play size={30} /></button>
        <button><Heart size={24} /></button>
        <button><User size={24} /></button>
      </nav>
    </div>
  );
}
