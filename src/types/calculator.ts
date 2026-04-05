export interface TimelineItem {
  month: number;
  totalValue: number;
  accumulatedProfit: number;
}

export interface CalculationResult {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  total: number;
  duration: string; 
  timeline: TimelineItem[];
}

export interface Bond {
  symbol: string;
  name?: string;
  firstYearInterestRate: number;
  periodYears: number;
  capitalization: boolean;
}