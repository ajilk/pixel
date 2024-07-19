'use client';

import React, { useRef, useEffect, useState } from 'react';
import Pixel from '../pixel';
import EventType from '../EventType.enum';

export default function Page() {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          window.fbq('track', EventType.ViewContent, { viewed: 'AD_ID' }, { eventID: 'AD_ID' });
          let events: any[] = JSON.parse(localStorage.getItem('events') ?? '[]');
          events.unshift({ name: EventType.ViewContent, metadata: { viewed: 'AD_ID' }, eventID: 'AD_ID' });
          localStorage.setItem('events', JSON.stringify(events));
          window.dispatchEvent(new Event('storage'));
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Pixel></Pixel>
      <p className="text-gray-500 pb-5">
        An event can be triggered when a user <b>performs an action</b> on a website, such as{' '}
        <b>scrolling to view specific content.</b> For instance, we can trigger the <b>ViewContent</b> standard event
        when the content is fully or partially visible, and it won't cause any problems if it's triggered multiple times
        when the user views the content multiple times. This is because Meta will remove duplicate events based on their
        unique event IDs. For example, the following event will be <b>deduplicated</b> because it has the same event ID
        (AD_ID).
      </p>
      <div className="overflow-auto border" style={{ height: '500px' }}>
        <div>
          <div
            ref={targetRef}
            className={
              'flex justify-center items-center my-96 mx-auto w-80 h-80 text-white ' +
              (visible ? 'bg-blue-500' : 'bg-red-500')
            }
          >
            <span className="text-3xl font-mono">{visible ? 'Visible' : 'Not Visible'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
