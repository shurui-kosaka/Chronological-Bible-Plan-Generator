
import React from 'react';
import { Calendar, Settings2, Sparkles } from 'lucide-react';
import { PlanConfig } from '../types';

interface PlanSettingsProps {
  config: PlanConfig;
  setConfig: (config: PlanConfig) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const PlanSettings: React.FC<PlanSettingsProps> = ({ config, setConfig, onGenerate, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex items-center gap-2 mb-6 text-slate-800">
        <Settings2 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Plan Configuration</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Plan Name</label>
          <input
            type="text"
            value={config.planName}
            onChange={(e) => setConfig({ ...config, planName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="e.g., My 2024 Journey"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={config.startDate}
              onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              Generate Chronological Plan
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-400 mt-3">
          Powered by Gemini AI for precise chronological sequencing
        </p>
      </div>
    </div>
  );
};

export default PlanSettings;
