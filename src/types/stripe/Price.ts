export type Currency = 'jpy';
export type Interval = 'day' | 'month' | 'week' | 'year';

export type Price = {
  id: string;
  title: string;
  description: string;
  unit_amount: number;
  currency: Currency;
  interval: Interval;
  intervalCount: number;
  intervalText: string;
  default: boolean;
};
