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
      <p className="text-gray-500 pb-5">Description of Scroll</p>
      <div className="overflow-auto border" style={{ height: '500px' }}>
        <div>
          <div
            ref={targetRef}
            className={
              'my-96 mx-auto text-center text-white align-baseline w-80 h-80 ' +
              (visible ? 'bg-blue-500' : 'bg-red-500')
            }
          >
            {visible ? 'Visible' : 'Not Visible'}
          </div>
        </div>
      </div>
    </div>
  );
}
