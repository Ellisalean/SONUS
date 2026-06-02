import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { addSong } from '../../lib/db';

export default function ContentManagement() {
  const [table, setTable] = useState<'anuncios' | 'agenda' | 'devocionales' | 'canciones'>('anuncios');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [artist, setArtist] = useState('');
  const [status, setStatus] = useState('');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        if (table === 'canciones') {
             // songs are managed via db.ts
             const { data } = await supabase.from('songs_v4').select('*');
             setItems(data || []);
        } else {
             const { data } = await supabase.from(table).select('*');
             setItems(data || []);
        }
    };
    fetchData();
  }, [table]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Guardando...');
    
    if (table === 'canciones') {
        const id = crypto.randomUUID();
        const songId = await addSong({ title, artist, chords: content }, id);
        if (songId) {
            setStatus('Canción guardada!');
            setTitle(''); setContent(''); setArtist('');
            fetchData();
        }
        else setStatus('Error guardando canción');
        return;
    }

    let payload;
    if (table === 'anuncios') {
        payload = { titulo: title, contenido: content };
    } else if (table === 'agenda') {
        payload = { title: title, fecha: new Date().toISOString(), time: '09:00 AM', type: 'event' };
    } else { // devocionales
        payload = { titulo: title, contenido: content, fecha: new Date().toISOString() };
    }
    const { error } = await supabase.from(table).insert(payload);
    if (error) setStatus('Error: ' + error.message);
    else { setStatus('Guardado!'); setTitle(''); setContent(''); fetchData(); }
  };

  const fetchData = async () => {
    if (table === 'canciones') {
        const { data } = await supabase.from('songs_v4').select('*');
        setItems(data || []);
    } else {
        const { data } = await supabase.from(table).select('*');
        setItems(data || []);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from(table === 'canciones' ? 'songs_v4' : table).delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Gestión de Contenido</h2>
      <select onChange={(e) => setTable(e.target.value as any)} className="w-full p-2 mb-4 border rounded">
        <option value="anuncios">Anuncios</option>
        <option value="devocionales">Devocionales</option>
        <option value="agenda">Agenda</option>
        <option value="canciones">Canciones</option>
      </select>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="w-full p-2 border rounded" required />
        {table === 'canciones' && <input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artista" className="w-full p-2 border rounded" required />}
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={table === 'canciones' ? 'Acordes' : 'Contenido'} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Añadir</button>
      </form>
      {status && <p className="mt-2 text-sm text-center mb-4">{status}</p>}
      
      <div className="space-y-2">
        {items.map(item => (
            <div key={item.id} className="p-2 border rounded flex justify-between items-center">
                <span>{item.titulo || item.title || item.name}</span>
                <button onClick={() => handleDelete(item.id)} className="text-red-500">Eliminar</button>
            </div>
        ))}
      </div>
    </div>
  );
}
