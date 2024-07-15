'use client';

import { MouseEvent, useState } from 'react';
import Pixel from '../pixel';
import EventType from '../EventType.enum';

export default function Home() {
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('readonly property');

  function handleCustomEvent(event: MouseEvent<HTMLButtonElement>) {
    const eventID = crypto.randomUUID();
    window.fbq('track', EventType.Custom, { f1: f1, f2: f2, f3: f3, f4: f4 }, { eventID: eventID });

    let events: any[] = JSON.parse(localStorage.getItem('events') ?? '[]');
    events.unshift({ name: EventType.Custom, metadata: { f1: f1, f2: f2, f3: f3, f4: f4 }, eventID: eventID });
    localStorage.setItem('events', JSON.stringify(events));
    window.dispatchEvent(new Event('storage'));

    setF1('');
    setF2('');
    setF3('');
  }

  return (
    <div>
      <Pixel></Pixel>
      <p className="text-gray-500 pb-5">
        Custom events are actions that <b>fall outside those covered by our standard events.</b> You can give them a
        unique name to represent the action taking place
      </p>
      <div className="grid grid-cols-5 gap-2">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Field 1"
          value={f1}
          onChange={(e) => setF1(e.target.value)}
        ></input>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Field 2"
          value={f2}
          onChange={(e) => setF2(e.target.value)}
        ></input>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Field 3"
          value={f3}
          onChange={(e) => setF3(e.target.value)}
        ></input>
        <label className="text-center self-center font-mono">Field 4: {f4}</label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={handleCustomEvent}
        >
          Custom Event
        </button>
      </div>
    </div>
  );
}
