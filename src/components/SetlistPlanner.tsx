import { useState, useEffect } from 'react';
import { Song, Setlist, getSetlists, addSetlist, updateSetlist, deleteSetlist, getSongs } from '../lib/db';
import { Plus, X, Trash2 } from 'lucide-react';

interface SetlistPlannerProps {
  onBack: () => void;
  onSelectSetlist: (setlist: Setlist) => void;
  isAdminMode: boolean;
}

export default function SetlistPlanner({ onBack, onSelectSetlist, isAdminMode }: SetlistPlannerProps) {
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSetlistName, setNewSetlistName] = useState('');
  const [editingSetlist, setEditingSetlist] = useState<Setlist | null>(null);

  useEffect(() => {
    async function loadData() {
      const [fetchedSetlists, fetchedSongs] = await Promise.all([getSetlists(), getSongs()]);
      setSetlists(fetchedSetlists);
      setSongs(fetchedSongs);
    }
    loadData();
  }, []);

  const createSetlist = async () => {
    if (!isAdminMode || !newSetlistName) return;
    const newId = await addSetlist({ name: newSetlistName, date: new Date().toISOString(), song_ids: [] });
    setSetlists([...setlists, { id: newId, name: newSetlistName, date: new Date().toISOString(), song_ids: [] }]);
    setNewSetlistName('');
  };

  const toggleSongInSetlist = async (setlist: Setlist, songId: string) => {
    if (!isAdminMode) return;
    const isSelected = setlist.song_ids.includes(songId);
    const newSongIds = isSelected 
      ? setlist.song_ids.filter(id => id !== songId)
      : [...setlist.song_ids, songId];
    
    const updatedSetlist = { ...setlist, song_ids: newSongIds };
    await updateSetlist(setlist.id, updatedSetlist);
    setSetlists(setlists.map(s => s.id === setlist.id ? updatedSetlist : s));
    setEditingSetlist(updatedSetlist);
  };

  const deleteSetlistById = async (id: string) => {
    await deleteSetlist(id);
    setSetlists(setlists.filter(s => s.id !== id));
  };

  return (
    <div className="p-4 bg-white h-full">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Planificador de Setlists</h2>
        <button onClick={onBack} className="text-gray-500">Cerrar</button>
      </header>

      <div className="mb-8">
        <input 
          value={newSetlistName}
          onChange={(e) => setNewSetlistName(e.target.value)}
          placeholder="Nombre del nuevo Setlist"
          className="w-full p-3 bg-gray-100 rounded-lg mb-2"
        />
        <button onClick={createSetlist} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2">
            <Plus size={20} /> Crear Setlist
        </button>
      </div>

      <div className="space-y-6">
        {setlists.map(setlist => (
          <div key={setlist.id} className="p-4 border rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50" onClick={() => onSelectSetlist(setlist)}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{setlist.name}</h3>
              <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setEditingSetlist(setlist); }} className="text-blue-600 font-medium">Editar</button>
                  {isAdminMode && <button onClick={(e) => { e.stopPropagation(); deleteSetlistById(setlist.id); }} className="text-red-500"><Trash2 size={18} /></button>}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{setlist.song_ids.length} canciones</p>
          </div>
        ))}
      </div>

      {editingSetlist && (
        <div className="fixed inset-0 bg-black/50 p-4 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <header className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">{editingSetlist.name}</h3>
                    <button onClick={() => setEditingSetlist(null)}><X /></button>
                </header>
                <div className="space-y-4">
                     <div>
                        <h4 className="font-semibold text-sm text-gray-500 mb-2">Canciones Seleccionadas (en orden) - <span className="text-blue-600 font-bold">Auto-guardando...</span></h4>
                        {editingSetlist.song_ids.map(id => {
                            const song = songs.find(s => s.id === id);
                            if (!song) return null;
                            return (
                                <button 
                                    key={song.id}
                                    onClick={() => toggleSongInSetlist(editingSetlist, song.id)}
                                    className="w-full p-4 rounded-xl flex justify-between items-center bg-blue-50 text-blue-900 mb-3 border-2 border-blue-200 transition-all hover:bg-blue-100"
                                >
                                    <span className="font-medium">{song.title} - {song.artist}</span>
                                    <span className="text-blue-600 font-bold text-lg">✓</span>
                                </button>
                            );
                        })}
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-gray-500 mb-2">Canciones Disponibles</h4>
                        {songs.filter(s => !editingSetlist.song_ids.includes(s.id)).map(song => (
                            <button 
                                key={song.id}
                                onClick={() => toggleSongInSetlist(editingSetlist, song.id)}
                                className="w-full p-4 rounded-xl flex justify-between items-center bg-gray-50 mb-3 border border-gray-200 transition-all hover:bg-gray-100"
                            >
                                <span className="font-medium">{song.title} - {song.artist}</span>
                                <Plus size={18} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
