
import React from 'react';
import { CheckCircle2, Circle, Search } from 'lucide-react';
import { ReadingDay } from '../types';

interface ReadingListProps {
  days: ReadingDay[];
  toggleComplete: (day: number) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ days, toggleComplete }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredDays = days.filter(d => 
    d.passages.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.day.toString().includes(searchTerm) ||
    d.date.includes(searchTerm)
  );

  if (days.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800">Reading Schedule</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search passages or dates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Day</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Reading Passages</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDays.map((day) => (
              <tr 
                key={day.day} 
                className={`group hover:bg-slate-50 transition-colors ${day.completed ? 'bg-indigo-50/30' : ''}`}
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                  {day.day}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {day.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold ${day.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                    {day.passages}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleComplete(day.day)}
                    className="flex items-center justify-center w-full focus:outline-none"
                  >
                    {day.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-50" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {filteredDays.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                  No readings found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadingList;
