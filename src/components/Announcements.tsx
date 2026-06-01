import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Announcement {
    id: string;
    created_at: string;
    titulo: string;
    contenido: string;
}

export default function Announcements({ onBack }: { onBack: () => void }) {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnnouncements() {
            setLoading(true);
            const { data, error } = await supabase
                .from('anuncios')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching announcements:', error);
            } else {
                setAnnouncements(data || []);
            }
            setLoading(false);
        }

        fetchAnnouncements();
    }, []);

    return (
        <div className="flex flex-col h-full bg-white text-gray-900 rounded-3xl overflow-hidden">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-12 rounded-b-[3rem] relative">
                <button onClick={onBack} className="mb-4">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold">Anuncios</h2>
            </header>
            
            <div className="flex-grow p-6 -mt-4 bg-white rounded-t-[2rem] shadow-lg">
                {loading ? (
                    <p className="text-center text-gray-500">Cargando anuncios...</p>
                ) : announcements.length === 0 ? (
                    <p className="text-center text-gray-500">No hay anuncios disponibles.</p>
                ) : (
                    announcements.map((a) => (
                        <div key={a.id} className="mb-6 border-b border-gray-100 pb-4">
                            <h4 className="font-bold text-lg mb-1">{a.titulo}</h4>
                            <p className="text-gray-500 text-sm">{a.contenido}</p>
                            <span className="text-xs text-gray-300">
                                {new Date(a.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}