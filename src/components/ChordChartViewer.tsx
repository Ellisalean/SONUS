import { useState } from 'react';
import { ChevronLeft, Minus, Plus } from 'lucide-react';

interface ChordChartViewerProps {
  title: string;
  artist: string;
  initialChords: string; // Plain text with [Chord]
  onBack: () => void;
}

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const resolveToSharp = (note: string) => {
    switch (note) {
        case 'Db': return 'C#';
        case 'Eb': return 'D#';
        case 'Gb': return 'F#';
        case 'Ab': return 'G#';
        case 'Bb': return 'A#';
        default: return note;
    }
}

const transposeChord = (chord: string, steps: number): string => {
    const match = chord.match(/^([A-G][b#]?)/);
    if (!match) return chord;
    
    const root = resolveToSharp(match[1]);
    const rest = chord.slice(match[1].length);
    
    const index = NOTES.indexOf(root);
    if (index === -1) return chord;
    
    const newIndex = (index + steps + 12) % 12;
    return NOTES[newIndex] + rest;
};

export default function ChordChartViewer({ title, artist, initialChords, onBack }: ChordChartViewerProps) {
  const [transposition, setTransposition] = useState(0);

  const renderChords = () => {
    // Replace literal \n with actual newlines, then split
    const processedChords = initialChords.replace(/\\n/g, '\n');
    // Improved regex to better capture chords
    const parts = processedChords.split(/(\[[A-G][b#]?(?:maj|min|m|dim|aug|sus[0-9]*|[0-9]*)?(?:\/[A-G][b#]?)?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const chord = part.slice(1, -1);
        const transposedChord = transposeChord(chord, transposition);
        return <span key={`${index}-${transposition}`} className="font-bold text-blue-600 bg-blue-50 px-1 rounded">{transposedChord}</span>;
      }
      return part;
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500">{artist}</p>
            </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Transpose:</span>
            <button onClick={() => setTransposition(t => t - 1)} className="p-1 sm:p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"><Minus size={16} /></button>
            <span className="font-mono font-bold w-8 sm:w-10 text-center text-blue-800 tabular-nums">{transposition > 0 ? '+' : ''}{transposition}</span>
            <button onClick={() => setTransposition(t => t + 1)} className="p-1 sm:p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"><Plus size={16} /></button>
        </div>
      </header>
      <div className="flex-1 p-6 overflow-y-auto whitespace-pre-wrap font-mono text-lg leading-loose">
        {renderChords()}
      </div>
    </div>
  );
}
