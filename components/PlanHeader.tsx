
import React from 'react';
import { BookOpen, Download, Calendar } from 'lucide-react';

interface PlanHeaderProps {
  onExport: () => void;
  isExportDisabled: boolean;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ onExport, isExportDisabled }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
            Bible<span className="text-indigo-600 italic">Chronos</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onExport}
            disabled={isExportDisabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm
              ${isExportDisabled 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'}`}
          >
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
      </div>
    </header>
  );
};

export default PlanHeader;
