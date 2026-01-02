
import React, { useState } from 'react';
import { PlanConfig, ReadingDay, GenerationStatus } from './types';
import PlanHeader from './components/PlanHeader';
import PlanSettings from './components/PlanSettings';
import ReadingList from './components/ReadingList';
import { generateChronologicalPlan } from './services/geminiService';
import { exportToExcel } from './services/excelService';
// Fix: Added missing Calendar import and consolidated lucide-react imports
import { AlertCircle, CheckCircle2, Download, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<PlanConfig>({
    startDate: new Date().toISOString().split('T')[0],
    planName: 'My Bible Reading Plan',
    durationDays: 365
  });
  
  const [readingPlan, setReadingPlan] = useState<ReadingDay[]>([]);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    try {
      const plan = await generateChronologicalPlan(config);
      setReadingPlan(plan);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate plan. Please try again.');
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleExport = () => {
    if (readingPlan.length === 0) return;
    exportToExcel(readingPlan, config.planName);
  };

  const toggleComplete = (dayId: number) => {
    setReadingPlan(prev => prev.map(d => 
      d.day === dayId ? { ...d, completed: !d.completed } : d
    ));
  };

  const completedCount = readingPlan.filter(d => d.completed).length;
  const progressPercent = readingPlan.length > 0 ? (completedCount / readingPlan.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PlanHeader 
        onExport={handleExport} 
        isExportDisabled={readingPlan.length === 0} 
      />
      
      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Build Your Plan</h2>
          <p className="text-slate-500">
            Customize your journey through the Bible in chronological order. 
            Once generated, you can track progress here or download the Excel version.
          </p>
        </div>

        <PlanSettings 
          config={config} 
          setConfig={setConfig} 
          onGenerate={handleGenerate} 
          isLoading={status === GenerationStatus.LOADING}
        />

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Generation Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {status === GenerationStatus.SUCCESS && readingPlan.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Progress Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-slate-800">Your Progress</span>
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    {completedCount} / {readingPlan.length} Days Completed
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="bg-indigo-50 px-6 py-3 rounded-xl border border-indigo-100">
                <span className="block text-xs text-indigo-500 font-bold uppercase tracking-wider mb-1">Total Chapters</span>
                <span className="text-2xl font-black text-indigo-900">1,189</span>
              </div>
            </div>

            <ReadingList 
              days={readingPlan} 
              toggleComplete={toggleComplete} 
            />
          </div>
        )}

        {status === GenerationStatus.IDLE && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
              <Calendar className="w-12 h-12" />
            </div>
            <p className="font-medium">Adjust settings above to begin your plan</p>
          </div>
        )}
      </main>
      
      {/* Floating CTA for small screens when plan exists */}
      {readingPlan.length > 0 && (
        <div className="fixed bottom-6 right-6 sm:hidden">
           <button
            onClick={handleExport}
            className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
          >
            <Download className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
