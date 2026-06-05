import { useState, useEffect } from 'react';
import { Song } from '../lib/songs';
import { supabase } from '../lib/supabase';
import { ChevronLeft, Music, Play, X, Plus, Trash2, Edit2, SkipBack, SkipForward } from 'lucide-react';

export default function MusicPlayer({ onBack, isAdminMode }: { onBack: () => void, isAdminMode: boolean }) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Song>({ id: '', title: '', artist: '', youtubeUrl: '' });

    const fetchSongs = async () => {
        const { data } = await supabase.from('songs_v4').select('*');
        if (data) {
            setSongs(data.map((song: any) => ({
                ...song,
                youtubeUrl: song.youtube_url || song.youtubeUrl
            })));
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleSave = async () => {
        try {
            const dataToSave = {
                id: formData.id || crypto.randomUUID(),
                title: formData.title,
                artist: formData.artist,
                youtubeUrl: formData.youtubeUrl
            };
            const { error } = await supabase.from('songs_v4').upsert(dataToSave);
            if (error) throw error;
            setShowModal(false);
            setIsEditing(false);
            fetchSongs();
        } catch (error) {
            alert('Error al guardar la canción.');
        }
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

    const getYouTubeId = (url: string | undefined | null) => {
        if (!url) return '';
        return url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop() || '';
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-white p-6">
            <header className="flex justify-between items-center mb-8">
                <button onClick={onBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                    <ChevronLeft />
                </button>
                <h1 className="text-lg font-bold">Laboratorio Musical</h1>
                <div className="w-10"></div>
            </header>

            {/* Wave and Player Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Spectral Wave Effect */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-xl pointer-events-none">
                    <div className="flex items-center gap-2">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className="w-2 bg-indigo-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 200 + 50}px`, animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>

                {/* Player Box */}
                <div className="relative w-64 h-64 z-10 bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                    {selectedSong ? (
                        selectedSong.youtubeUrl ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${getYouTubeId(selectedSong.youtubeUrl)}?controls=1&autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <div className="text-center p-4">
                                <div className="font-bold text-lg mb-1 truncate">{selectedSong.title}</div>
                                <div className="text-sm text-slate-400">{selectedSong.artist}</div>
                            </div>
                        )
                    ) : (
                        <Music size={64} className="text-slate-600" />
                    )}
                </div>
            </div>

            {/* Playlist */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Recent Sounds</h3>
                     {isAdminMode && (
                        <button onClick={() => { setFormData({ id: '', title: '', artist: '', youtubeUrl: '' }); setIsEditing(false); setShowModal(true); }} className="p-2 bg-slate-800 rounded-full">
                            <Plus size={20} />
                        </button>
                     )}
                </div>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {songs.map(song => (
                        <div key={song.id} 
                             onClick={() => setSelectedSong(song)}
                             className="flex items-center gap-4 p-3 bg-slate-900 rounded-2xl hover:bg-slate-800 transition cursor-pointer">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                <img src={`https://img.youtube.com/vi/${getYouTubeId(song.youtubeUrl)}/mqdefault.jpg`} alt={song.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                     <Play size={16} className="text-white" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="font-semibold truncate">{song.title}</div>
                                <div className="text-xs text-slate-400 truncate">{song.artist}</div>
                            </div>
                            {isAdminMode && (
                                <div className="flex gap-2">
                                    <button onClick={(e) => startEdit(song, e)} className="text-slate-500 hover:text-indigo-400"><Edit2 size={16} /></button>
                                    <button onClick={(e) => handleDelete(song.id, e)} className="text-slate-500 hover:text-red-400"><Trash2 size={16} /></button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
                        <h2 className="font-bold text-lg text-white">{isEditing ? 'Editar canción' : 'Añadir canción'}</h2>
                        <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-3 bg-slate-800 border-none rounded-xl text-white" />
                        <input type="text" placeholder="Artista" value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} className="p-3 bg-slate-800 border-none rounded-xl text-white" />
                        <input type="text" placeholder="URL de Youtube" value={formData.youtubeUrl} onChange={e => setFormData({...formData, youtubeUrl: e.target.value})} className="p-3 bg-slate-800 border-none rounded-xl text-white" />
                        <div className="flex gap-2">
                             <button onClick={() => setShowModal(false)} className="flex-1 p-3 bg-slate-800 rounded-xl text-white">Cancelar</button>
                             <button onClick={handleSave} className="flex-1 p-3 bg-indigo-600 text-white rounded-xl">Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
