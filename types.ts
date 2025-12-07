
export type ScreenId = 'landing' | 'scenario-a' | 'scenario-b' | 'scenario-c' | 'chat' | 'profile';

export interface TimelineStep {
  id: string;
  icon: 'home' | 'car' | 'bag' | 'shield' | 'passport' | 'door';
  title: string;
  time?: string;
  status: 'completed' | 'current' | 'warning' | 'critical' | 'upcoming';
  badge?: string;
  badgeColor?: 'emerald' | 'red' | 'orange' | 'cyan';
  description?: string;
  subtext?: string;
  action?: () => void;
  actionLabel?: string;
  isCurrent?: boolean; // New property to explicitly mark user location
}

export interface ScenarioData {
  id: string;
  flightStatus: 'ontime' | 'delayed';
  totalTime: string;
  steps: TimelineStep[];
  aiRecommendation?: {
    title: string;
    description: string;
    actionLabel: string;
    savedTime: string;
    targetScreen: ScreenId;
  };
}
