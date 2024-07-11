export enum EventType {
  AddToCart = 'AddToCart',
}

export default class Pixel {
  fbq(type: EventType, metadata: any, event_properties: any) {
    window.fbq('track', type, metadata, event_properties);
  }
}
