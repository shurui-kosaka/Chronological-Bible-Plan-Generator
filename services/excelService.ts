
import { ReadingDay } from "../types";

// Note: XLSX is loaded via CDN in index.html and is available on window
declare const XLSX: any;

export const exportToExcel = (plan: ReadingDay[], planName: string) => {
  const worksheetData = [
    ["Day", "Date", "Passages", "Completed"],
    ...plan.map(d => [d.day, d.date, d.passages, d.completed ? "Yes" : "No"])
  ];

  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reading Plan");

  // Style adjustments could be added here if needed using cell objects
  
  const fileName = `${planName.replace(/\s+/g, '_')}_Chronological_Plan.xlsx`;
  XLSX.writeFile(wb, fileName);
};
