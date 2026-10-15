/**
 * Google Analytics 4 (GA4) Integration & Event Tracking Helper
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface GAEventLog {
  id: string;
  timestamp: string;
  eventName: string;
  params: Record<string, any>;
}

// Event log listener for debug/inspector UI
type EventLogListener = (logs: GAEventLog[]) => void;
const listeners: Set<EventLogListener> = new Set();
const eventLogs: GAEventLog[] = [];

export function subscribeToGALogs(listener: EventLogListener): () => void {
  listeners.add(listener);
  listener([...eventLogs]);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener([...eventLogs]));
}

const DEFAULT_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || 'G-SALKINTECH4';

let currentMeasurementId = DEFAULT_MEASUREMENT_ID;
let isInitialized = false;

export function initGA(customId?: string): string {
  const measurementId = customId || currentMeasurementId;
  currentMeasurementId = measurementId;

  if (typeof window === 'undefined') return measurementId;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
  }

  // Check if script tag already exists
  const existingScript = document.getElementById('ga-gtag-script');
  if (!existingScript && measurementId) {
    const script = document.createElement('script');
    script.id = 'ga-gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // We manually trigger for SPA accuracy
    anonymize_ip: true,
  });

  isInitialized = true;

  logEventInternal('gtag_initialized', {
    measurement_id: measurementId,
    timestamp: new Date().toISOString(),
  });

  return measurementId;
}

function logEventInternal(eventName: string, params: Record<string, any> = {}) {
  const logItem: GAEventLog = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    eventName,
    params,
  };
  eventLogs.unshift(logItem);
  if (eventLogs.length > 50) eventLogs.pop();
  notifyListeners();
}

/**
 * Tracks a GA4 Page View
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === 'undefined') return;
  if (!isInitialized) initGA();

  const title = pageTitle || document.title;
  window.gtag?.('event', 'page_view', {
    page_path: pagePath,
    page_title: title,
    page_location: window.location.href,
  });

  logEventInternal('page_view', {
    page_path: pagePath,
    page_title: title,
  });
}

/**
 * Tracks custom user interactions and business conversion events
 */
export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;
  if (!isInitialized) initGA();

  window.gtag?.('event', eventName, params);
  logEventInternal(eventName, params);
}

export function getCurrentMeasurementId(): string {
  return currentMeasurementId;
}

export function getEventLogs(): GAEventLog[] {
  return [...eventLogs];
}
