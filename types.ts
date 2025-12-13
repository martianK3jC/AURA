
export type ScreenId = 'landing' | 'traveler-login' | 'onboarding' | 'scenario-a' | 'scenario-b' | 'scenario-c' | 'chat' | 'profile' | 'operator-dashboard' | 'arrival-dashboard' | 'destination-input' | 'transportation-options' | 'route-tracking';

export type TravelDirection = 'arrival' | 'departure';

export interface TravelerContext {
  travelDirection: TravelDirection;
  userName: string; // Now required
  flightNumber?: string;
  destination?: string; // For arrival mode
  origin?: string; // For departure mode
}

export interface TimelineStep {
  id: string;
  icon: 'home' | 'car' | 'bag' | 'shield' | 'passport' | 'door' | 'plane' | 'bus' | 'walk';
  title: string;
  time?: string;
  status: 'completed' | 'current' | 'warning' | 'critical' | 'upcoming';
  badge?: string;
  badgeColor?: 'emerald' | 'red' | 'orange' | 'cyan' | 'green' | 'purple';
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

// ========== ARRIVAL FLOW TYPES ==========

export type ArrivalStage = 'landing' | 'immigration' | 'baggage' | 'transportation' | 'en-route' | 'arrived';

export interface ArrivalJourney {
  stage: ArrivalStage;
  flightNumber: string;
  landingTime: string;
  estimatedExitTime: string;
  destination?: DestinationInfo;
  selectedTransport?: TransportationOption;
  steps: ArrivalTimelineStep[];
}

export interface ArrivalTimelineStep {
  id: string;
  stage: ArrivalStage;
  title: string;
  description: string;
  estimatedDuration: number; // in minutes
  status: 'pending' | 'in-progress' | 'completed';
  waitTime?: number; // in minutes
  location?: string;
}

// ========== DESTINATION & LOCATION TYPES ==========

export type CebuRegion = 'Lapu-Lapu City' | 'Cebu City' | 'Mandaue City' | 'Other';

export type DestinationType = 'hotel' | 'resort' | 'residential' | 'attraction' | 'business' | 'other';

export interface DestinationInfo {
  name: string;
  address: string;
  region: CebuRegion;
  type: DestinationType;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distanceFromAirport: number; // in kilometers
  estimatedTravelTime: number; // in minutes
}

// ========== TRANSPORTATION TYPES ==========

export type TransportationType = 'grab' | 'taxi' | 'shuttle' | 'private' | 'bus';

export interface TransportationOption {
  id: string;
  type: TransportationType;
  name: string;
  description: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  estimatedDuration: number; // in minutes
  availability: 'available' | 'limited' | 'unavailable';
  features: string[];
  icon: string;
  bookingMethod: 'app' | 'call' | 'counter' | 'online';
  pickupLocation?: string;
}

// ========== ROUTE PLANNING TYPES ==========

export interface RouteInfo {
  origin: string;
  destination: DestinationInfo;
  distance: number; // in kilometers
  estimatedDuration: number; // in minutes
  trafficCondition: 'light' | 'moderate' | 'heavy' | 'severe';
  alternativeRoutes?: AlternativeRoute[];
  waypoints?: Waypoint[];
}

export interface AlternativeRoute {
  id: string;
  name: string;
  distance: number;
  duration: number;
  trafficCondition: 'light' | 'moderate' | 'heavy';
  savings: {
    time?: number; // minutes saved
    distance?: number; // km saved
  };
}

export interface Waypoint {
  id: string;
  name: string;
  type: 'restaurant' | 'attraction' | 'rest-stop' | 'gas-station';
  detourTime: number; // additional minutes
  rating?: number;
  description?: string;
}

// ========== NOTIFICATION TYPES ==========

export type NotificationType = 'info' | 'warning' | 'critical' | 'success';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionLabel?: string;
  action?: () => void;
  targetScreen?: ScreenId;
}

// ========== LIVE TRACKING TYPES ==========

export interface LiveTracking {
  isActive: boolean;
  currentLocation: {
    lat: number;
    lng: number;
  };
  destination: DestinationInfo;
  estimatedArrival: string;
  remainingDistance: number; // in kilometers
  remainingTime: number; // in minutes
  driverInfo?: {
    name: string;
    vehicle: string;
    plateNumber: string;
    rating: number;
  };
}
