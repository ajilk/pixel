export {};

declare global {
  interface Window {
    fbq: (method: string, event_name: string, metadata?: any, event_properties?: any) => void;
  }
}
