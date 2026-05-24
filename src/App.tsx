/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Home, Library, PlusCircle, Heart, User, Search, Bell, Music, Calendar, FileText, BarChart2, Mic, Megaphone, CalendarDays, BookOpen, Play } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import SheetMusicList from './components/SheetMusicList';
import SetlistPlanner from './components/SetlistPlanner';
import PdfViewer from './components/PdfViewer';
import ChordChartViewer from './components/ChordChartViewer';
import TunerTools from './components/TunerTools';
import Announcements from './components/Announcements';
import CalendarView from './components/Calendar';
import Devotionals from './components/Devotionals';
import MusicPlayer from './components/MusicPlayer';
import SplashScreen from './components/SplashScreen';
import { Song, Setlist, getSongs } from './lib/db';
import { resetSongs, forceResetSongs } from './lib/seed';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentView, setCurrentView] = useState('menu');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [activeSetlist, setActiveSetlist] = useState<Setlist | null>(null);
  const [resetState, setResetState] = useState<'idle' | 'confirming' | 'resetting' | 'done'>('idle');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    console.log("Setting up auth listener...");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Auth state changed, user:", currentUser ? currentUser.email : "null");
        setUser(currentUser);
        if (currentUser && currentUser.email === import.meta.env.VITE_ADMIN_EMAIL) {
            console.log("User authorized as Admin.");
            setIsAdminMode(true);
        } else {
            if (currentUser) console.log("User not authorized as Admin. Email:", currentUser.email, "Expected:", import.meta.env.VITE_ADMIN_EMAIL);
            setIsAdminMode(false);
        }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function initializeData() {
      if (initialized.current) return;
      initialized.current = true;
      try {
        console.log("App initializing...");
        const songs = await getSongs();
        if (songs.length === 0) {
            console.log("Database empty, seeding...");
            await resetSongs();
            console.log("Database seeded successfully.");
        }
        console.log("Initialization complete.");
      } catch (error) {
        console.error("Failed to initialize:", error);
      }
      setIsInitialized(true);
    }
    initializeData();
  }, []);

  const menuItems = [
    { title: 'Partituras', icon: FileText, color: 'text-blue-600', action: () => setCurrentView('sheetMusic') },
    { title: 'Setlists', icon: BarChart2, color: 'text-orange-500', action: () => setCurrentView('setlistPlanner') },
    { title: 'Afinador y Tools', icon: Mic, color: 'text-teal-500', action: () => setCurrentView('tuner') },
    { title: 'Anuncios', icon: Megaphone, color: 'text-red-500', action: () => setCurrentView('announcements') },
    { title: 'Calendario', icon: CalendarDays, color: 'text-purple-600', action: () => setCurrentView('calendar') },
    { title: 'Devocionales', icon: BookOpen, color: 'text-indigo-600', action: () => setCurrentView('devotionals') },
  ];

  if (!isInitialized) {
      return <div className="min-h-screen bg-slate-900" />;
  }
  
  if (showSplash) {
      return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  const renderContent = () => {
    if (currentView === 'sheetMusic') {
      return <SheetMusicList 
        filterBySetlist={activeSetlist || undefined}
        onClearFilter={() => setActiveSetlist(null)}
        onSongClick={(song) => {
          setSelectedSong(song);
          setCurrentView('viewer');
      }} />;
    }
    
    if (currentView === 'setlistPlanner') {
        return <SetlistPlanner 
            isAdminMode={isAdminMode}
            onSelectSetlist={(setlist) => {
                setActiveSetlist(setlist);
                setCurrentView('sheetMusic');
            }}
            onBack={() => setCurrentView('menu')} />;
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

    if (currentView === 'tuner') {
        return <TunerTools onBack={() => setCurrentView('menu')} />;
    }
    
    if (currentView === 'announcements') {
        return <Announcements onBack={() => setCurrentView('menu')} />;
    }
    
    if (currentView === 'calendar') {
        return <CalendarView onBack={() => setCurrentView('menu')} />;
    }
    
    if (currentView === 'devotionals') {
        return <Devotionals onBack={() => setCurrentView('menu')} />;
    }
    
    if (currentView === 'music') {
        return <MusicPlayer onBack={() => setCurrentView('menu')} />;
    }
    // Main Menu
    return (
      <>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar" 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all" 
          />
        </div>
       
        <div className="flex justify-end mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${isAdminMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {isAdminMode ? 'Modo Admin: ON' : 'Modo Admin: OFF'}
            </span>
        </div>

        {isAdminMode && <>
            {resetState === 'idle' && (
              <button 
                  onClick={() => setResetState('confirming')}
                  className="w-full mb-4 p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 font-bold transition-all text-center"
              >
                  Resetear Base de Datos
              </button>
            )}

            {resetState === 'confirming' && (
              <div className="w-full mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col gap-3">
                <p className="text-red-800 text-sm font-bold text-center">
                  ¿Estás seguro de resetear la base de datos? Esto borrará todo y recargará la lista original.
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={async () => {
                      setResetState('resetting');
                      try {
                        await resetSongs();
                        setResetState('done');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                      } catch (err) {
                        console.error(err);
                        setResetState('idle');
                      }
                    }}
                    className="flex-1 p-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
                  >
                    Sí, Resetear
                  </button>
                  <button 
                    onClick={() => setResetState('idle')}
                    className="flex-1 p-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {resetState === 'resetting' && (
              <div className="w-full mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-xl font-bold text-center animate-pulse">
                Restableciendo canciones... Por favor espera.
              </div>
            )}

            {resetState === 'done' && (
              <div className="w-full mb-4 p-3 bg-green-100 text-green-700 rounded-xl font-bold text-center">
                ¡Base de datos reseteada exitosamente!
              </div>
            )}
        </>}

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
              <span className="font-extrabold text-sm">{item.title}</span>
            </motion.button>
          ))}
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-emerald-400 to-orange-300 text-gray-900 p-4 pb-32 font-sans">
      {currentView !== 'viewer' && (
        <header className="flex justify-between items-center mb-6 pt-4">
          <div className="flex items-center gap-2">
              {currentView !== 'menu' && (
                  <button onClick={() => setCurrentView('menu')} className="p-3 bg-white rounded-full shadow-md border hover:bg-gray-50 transition-colors font-bold">
                      ← Atrás
                  </button>
              )}
              <h1 className={`text-5xl font-extrabold tracking-tight ${currentView === 'menu' ? 'font-logo' : ''}`}>
                  {currentView === 'menu' ? 'SONUS' : 'Partituras'}
              </h1>
          </div>
          <button className="p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors">
            <Bell size={20} />
          </button>
        </header>
      )}

      {renderContent()}

      {currentView !== 'viewer' && (
        /* Bottom Navigation */
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex justify-between px-8 text-gray-400">
          <button onClick={() => setCurrentView('menu')} className={currentView === 'menu' ? "text-blue-600" : ""}><Home size={24} /></button>
          <button onClick={() => setCurrentView('sheetMusic')} className={currentView === 'sheetMusic' ? "text-blue-600" : ""}><Library size={24} /></button>
          <button onClick={() => setCurrentView('music')} className="bg-blue-600 text-white p-3 rounded-full -mt-8 shadow-xl"><Play size={30} /></button>
          <button><Heart size={24} /></button>
          {user ? (
            <button onClick={() => signOut(auth)} className="text-green-600 flex flex-col items-center">
              <User size={24} />
              <span className="text-[10px] font-bold">Log out</span>
            </button>
          ) : (
            <button onClick={async () => {
              const provider = new GoogleAuthProvider();
              try {
                await signInWithRedirect(auth, provider);
              } catch(e) {
                console.error("Sign-in failed:", e);
                alert("Sign-in failed. Please check the console for details. Ensure your domain is authorized in Firebase console.");
              }
            }} className="text-gray-400 flex flex-col items-center">
              <User size={24} />
              <span className="text-[10px] font-bold">Log in</span>
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
