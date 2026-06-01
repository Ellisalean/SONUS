import { ChevronLeft } from 'lucide-react';

interface PdfViewerProps {
  title: string;
  pdf_url: string;
  onBack: () => void;
}

export default function PdfViewer({ title, pdf_url, onBack }: PdfViewerProps) {
  return (
    <div id="pdf-viewer-container" className="h-screen flex flex-col bg-white">
      <header className="p-4 flex items-center gap-4 border-b border-gray-100 bg-white">
        <button 
          id="back-button" 
          onClick={onBack} 
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </header>
      <iframe
        id="pdf-frame"
        src={pdf_url}
        className="flex-1 w-full border-none"
        title={title}
      />
    </div>
  );
}
