import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '../lib/supabase';

interface CalendarEvent {
    id: string;
    date: string;
    title: string;
    time: string;
    type: 'rehearsal' | 'event';
}

export default function Calendar({ onBack }: { onBack: () => void }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        async function fetchEvents() {
            const { data, error } = await supabase
                .from('agenda')
                .select('*');
            if (error) console.error(error);
            else setEvents(data || []);
        }
        fetchEvents();
    }, []);

    const addEvent = async () => {
        if (!newTitle) return;
        const { data, error } = await supabase
            .from('agenda')
            .insert({
                date: selectedDate.toISOString(),
                title: newTitle,
                time: '9:00 am - 10:00 am',
                type: 'event'
            })
            .select();
        
        if (error) console.error(error);
        else setEvents([...events, ...(data || [])]);
        setNewTitle('');
    };

    const deleteEvent = async (id: string) => {
        const { error } = await supabase.from('agenda').delete().eq('id', id);
        if (error) console.error(error);
        else setEvents(events.filter(e => e.id !== id));
    };

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentDate)),
        end: endOfWeek(endOfMonth(currentDate))
    });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="flex flex-col h-full bg-slate-50 text-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <header className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white p-6 pb-12 rounded-b-[2.5rem] relative">
                <button onClick={onBack} className="mb-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-extrabold tracking-tight">Calendario</h2>
                    <CalendarIcon size={24} className="text-white/80" />
                </div>
            </header>

            <div className="flex-grow p-4 -mt-4 bg-white rounded-t-[2rem] shadow-xl">
                <div className="flex justify-between items-center mb-6 px-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft className="text-slate-600"/></button>
                    <h3 className="font-extrabold text-lg text-slate-800">{format(currentDate, 'MMMM yyyy', { locale: es })}</h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight className="text-slate-600"/></button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                    {['Do','Lu','Ma','Mi','Ju','Vi','Sá'].map(d => <div key={d} className="text-slate-400 font-bold pb-2">{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => {
                        const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));
                        const isEvent = dayEvents.length > 0;
                        const isRehearsal = dayEvents.some(e => e.type === 'rehearsal');
                        const isSelected = isSameDay(day, selectedDate);
                        
                        return (
                            <button 
                                key={i} 
                                onClick={() => setSelectedDate(day)}
                                className={`aspect-square flex items-center justify-center rounded-2xl text-sm font-semibold transition
                                    ${!isSameMonth(day, currentDate) ? 'text-slate-300' : 'text-slate-700'}
                                    ${isSelected ? 'bg-indigo-100 text-indigo-700' : ''}
                                    ${isEvent ? 'relative' : ''}
                                `}
                            >
                                {format(day, 'd')}
                                {isEvent && <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isRehearsal ? 'bg-teal-500' : 'bg-rose-500'}`}></div>}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-8 flex gap-4 text-xs font-semibold px-2">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Ensayos</div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Eventos</div>
                </div>

                <div className="mt-4 flex gap-2 flex-col">
                  <p className="text-sm text-slate-600 font-bold">Añadir evento para {format(selectedDate, 'd MMM, yyyy', { locale: es })}</p>
                  <div className="flex gap-2">
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Título del evento..." className="flex-grow p-2 border rounded-xl" />
                    <button onClick={addEvent} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Añadir</button>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                    {events.filter(e => isSameMonth(new Date(e.date), currentDate)).map(e => (
                        <div key={e.id} className="p-4 mb-2 bg-slate-50 rounded-2xl flex items-center justify-between gap-4">
                            <div className="flex gap-4 items-center">
                                <div className={`w-1 h-10 rounded ${e.type === 'rehearsal' ? 'bg-teal-500' : 'bg-rose-500'}`}></div>
                                <div>
                                    <h4 className="font-extrabold text-slate-800">{e.title}</h4>
                                    <p className="text-xs text-slate-500 font-bold">{e.time} • {format(new Date(e.date), 'MMM d')}</p>
                                </div>
                            </div>
                            <button onClick={() => deleteEvent(e.id)} className="text-rose-400 p-2"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
