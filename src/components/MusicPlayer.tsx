import { useState, useEffect } from 'react';
import { songs as initialSongs, Song } from '../lib/songs';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, Music, Play, X, Plus, Trash2, Edit2 } from 'lucide-react';

export default function MusicPlayer({ onBack }: { onBack: () => void }) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Song>({ id: '', title: '', artist: '', youtubeUrl: '' });

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        const { data } = await supabase.from('songs_v4').select('*');
        if (data) setSongs(data);
    };

    const handleSave = async () => {
        if (isEditing) {
            await supabase.from('songs_v4').update({ title: formData.title, artist: formData.artist, youtubeUrl: formData.youtubeUrl }).eq('id', formData.id);
        } else {
            await supabase.from('songs_v4').insert({ id: crypto.randomUUID(), title: formData.title, artist: formData.artist, youtubeUrl: formData.youtubeUrl });
        }
        setShowModal(false);
        setIsEditing(false);
        fetchSongs();
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        await supabase.from('songs_v4').delete().eq('id', id);
        fetchSongs();
    };

    const startEdit = (song: Song, e: React.MouseEvent) => {
        e.stopPropagation();
        setFormData(song);
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="relative h-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-b-[3rem] px-6 pt-10 flex flex-col items-center">
                <div className="w-full flex justify-between items-center text-white">
                    <button onClick={onBack} className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm transition">
                        <ChevronLeft />
                    </button>
                    <h1 className="text-xl font-bold">Laboratorio Musical</h1>
                    <button 
                        onClick={() => {
                            setFormData({ id: '', title: '', artist: '', youtubeUrl: '' });
                            setIsEditing(false);
                            setShowModal(true);
                        }}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm transition"
                    >
                        <Plus />
                    </button>
                </div>

                <div className="mt-8 bg-white/20 p-6 rounded-full shadow-lg backdrop-blur-md">
                    <Music size={48} className="text-white" />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 pt-6">
                <h3 className="font-extrabold text-slate-800 mb-4 tracking-tight">Repertorio</h3>
                <div className="space-y-4 pb-12">
                    {songs.map(song => (
                        <div 
                            key={song.id}
                            onClick={() => {
                                setSelectedSong(song);
                                setShowPlayer(true);
                            }}
                            className="w-full flex items-center gap-4 p-4 rounded-3xl border transition shadow-sm bg-white border-transparent hover:border-indigo-100"
                        >
                            <div className="p-3 bg-indigo-50 rounded-2xl">
                                <Play size={20} className="text-indigo-600" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-slate-900">{song.title}</div>
                                <div className="text-xs text-slate-500 font-medium">{song.artist}</div>
                            </div>
                            <button onClick={(e) => startEdit(song, e)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 size={18} /></button>
                            <button onClick={(e) => handleDelete(song.id, e)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>

            {showPlayer && selectedSong && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-lg">{selectedSong.title}</h2>
                            <button onClick={() => setShowPlayer(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
                        <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedSong.youtubeUrl.includes('v=') ? selectedSong.youtubeUrl.split('v=')[1] : selectedSong.youtubeUrl.split('/').pop()}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
                        <h2 className="font-bold text-lg">{isEditing ? 'Editar canción' : 'Añadir canción'}</h2>
                        <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-3 border rounded-xl" />
                        <input type="text" placeholder="Artista" value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} className="p-3 border rounded-xl" />
                        <input type="text" placeholder="URL de Youtube" value={formData.youtubeUrl} onChange={e => setFormData({...formData, youtubeUrl: e.target.value})} className="p-3 border rounded-xl" />
                        <div className="flex gap-2">
                             <button onClick={() => setShowModal(false)} className="flex-1 p-3 bg-gray-100 rounded-xl hover:bg-gray-200">Cancelar</button>
                             <button onClick={handleSave} className="flex-1 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
