import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, Music, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Setlist, subscribeToSongs, Song, getSongs, deleteSong } from '../lib/db';

interface SheetMusicListProps {
  onSongClick: (song: Song) => void;
  filterBySetlist?: Setlist;
  onClearFilter?: () => void;
}

export default function SheetMusicList({ onSongClick, filterBySetlist, onClearFilter }: SheetMusicListProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [activeTab, setActiveTab] = useState('Recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getSongs().then(setSongs);
    const unsubscribe = subscribeToSongs(setSongs);
    
    return () => { unsubscribe(); };
  }, []);
  const filteredSongs = songs.filter(song => {
    const matchesSetlist = filterBySetlist ? filterBySetlist.song_ids.includes(song.id) : true;
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'Favorites' ? favorites.includes(song.id) : true;
    return matchesSetlist && matchesSearch && matchesTab;
  });

  if (filterBySetlist) {
    filteredSongs.sort((a, b) => {
        const indexA = filterBySetlist.song_ids.indexOf(a.id);
        const indexB = filterBySetlist.song_ids.indexOf(b.id);
        return indexA - indexB;
    });
  }

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans p-4 pb-24">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-bold tracking-tight">{filterBySetlist ? filterBySetlist.name : 'Sheet Music Menu'}</h1>
        {filterBySetlist && <button onClick={onClearFilter}><X /></button>}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search" 
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all" 
        />
      </div>

      <div className="flex gap-6 mb-6 text-sm font-medium text-gray-500 border-b border-gray-100 pb-2">
        {['Recent', 'Favorites', 'All Songs'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`${activeTab === tab ? 'text-gray-900 border-b-2 border-gray-900' : ''} pb-2`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredSongs.map(song => (
          <motion.div 
            key={song.id}
            whileHover={{ scale: 1.01 }}
            className="flex items-center gap-4 p-2 cursor-pointer"
            onClick={() => onSongClick(song)}
          >
            <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              <Music size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{song.title}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            <button onClick={(e) => toggleFavorite(e, song.id)} className="mr-2">
              <Heart size={20} className={favorites.includes(song.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
            </button>
            <button className="text-gray-400"><MoreHorizontal /></button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
