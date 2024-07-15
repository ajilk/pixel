'use client';

import { MouseEvent, useState } from 'react';
import Pixel from '../pixel';
import EventType from '../EventType.enum';

export default function Home() {
  const [quantity, setQuantity] = useState('');
  const [item, setItem] = useState('');
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    const eventID = crypto.randomUUID();
    window.fbq('track', EventType.AddToCart, { item: item, quantity: quantity }, { eventID: eventID });

    let events: any[] = JSON.parse(localStorage.getItem('events') ?? '[]');
    events.unshift({ name: EventType.AddToCart, metadata: { item: item, quantity: quantity }, eventID: eventID });
    localStorage.setItem('events', JSON.stringify(events));
    window.dispatchEvent(new Event('storage'));

    setQuantity('');
  }

  function handleLead(event: MouseEvent<HTMLButtonElement>) {
    const eventID = crypto.randomUUID();
    window.fbq('track', EventType.Lead, { fn: fn, ln: ln }, { eventID: eventID });

    let events: any[] = JSON.parse(localStorage.getItem('events') ?? '[]');
    events.unshift({ name: EventType.Lead, metadata: { fn: fn, ln: ln }, eventID: eventID });
    localStorage.setItem('events', JSON.stringify(events));
    window.dispatchEvent(new Event('storage'));

    setFn('');
    setLn('');
  }

  return (
    <div>
      <Pixel></Pixel>
      <p className="text-gray-500 pb-5">
        Standard events are <b>predefined by Meta </b>and can be used to <b>log</b> conversions, <b>optimize</b> for
        conversions and <b>build </b>audiences
      </p>
      <div className="grid grid-cols-3 gap-10">
        <div className="grid grid-rows-2 gap-1">
          <label className="font-semibold my-auto">Item</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="e.g. Bike"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          ></input>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <label className="font-semibold my-auto">Quantity</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="e.g. 10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <div></div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <label className="font-semibold my-auto">First Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="e.g. John"
            value={fn}
            onChange={(e) => setFn(e.target.value)}
          ></input>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <label className="font-semibold my-auto">Last Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="e.g. Doe"
            value={ln}
            onChange={(e) => setLn(e.target.value)}
          ></input>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <div></div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            onClick={handleLead}
          >
            Lead
          </button>
        </div>
      </div>
    </div>
  );
}
