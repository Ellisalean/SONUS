import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Devotional {
    id: string;
    created_at: string;
    title: string;
    verse: string;
    reflection: string;
}

export default function Devotionals({ onBack }: { onBack: () => void }) {
    const [devotionals, setDevotionals] = useState<Devotional[]>([]);
    const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDevotionals() {
            setLoading(true);
            const { data, error } = await supabase
                .from('devocionales')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching devotionals:', error);
            } else {
                const mappedData: Devotional[] = (data || []).map((d: any) => ({
                    id: d.id,
                    created_at: d.created_at || d.fecha,
                    title: d.titulo || d.title || 'Sin título',
                    verse: 'Versículo no disponible',
                    reflection: d.contenido || d.reflection || ''
                }));
                setDevotionals(mappedData);
            }
            setLoading(false);
        }

        fetchDevotionals();
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
            <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white p-6 pb-12 rounded-b-[2.5rem] relative">
                <button onClick={onBack} className="mb-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-extrabold tracking-tight">Devocionales</h2>
                    <BookOpen size={24} className="text-white/80" />
                </div>
            </header>

            <div className="flex-grow p-4 -mt-4 bg-white rounded-t-[2rem] shadow-xl">
                <div className="space-y-4">
                    {loading ? (
                        <p className="text-center text-slate-500">Cargando...</p>
                    ) : (
                        devotionals.map((d) => (
                            <button 
                                key={d.id} 
                                onClick={() => setSelectedDevotional(d)}
                                className="w-full text-left p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-indigo-200 transition"
                            >
                                <div className="text-xs text-slate-400 font-bold mb-1">{new Date(d.created_at).toLocaleDateString()}</div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">{d.title}</h4>
                                <div className="text-xs italic text-indigo-600 mb-2">{d.verse}</div>
                                <p className="text-sm text-slate-600 line-clamp-2">{d.reflection}</p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {selectedDevotional && (
                <div className="absolute inset-0 bg-white p-6 z-10 flex flex-col pt-12 overflow-y-auto">
                    <button onClick={() => setSelectedDevotional(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                    <div className="text-sm text-indigo-600 font-bold mb-2">{new Date(selectedDevotional.created_at).toLocaleDateString()}</div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{selectedDevotional.title}</h2>
                    <div className="text-md font-bold text-indigo-800 mb-6 bg-indigo-50 p-3 rounded-lg">{selectedDevotional.verse}</div>
                    <p className="text-lg text-slate-700 leading-relaxed">{selectedDevotional.reflection}</p>
                </div>
            )}
        </div>
    );
}
