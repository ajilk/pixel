'use client';

import { MouseEvent, useState } from 'react';
import Pixel, { EventType } from './services/pixel.service';

export default function Home() {
  const pixel: Pixel = new Pixel();
  const [quantity, setQuantity] = useState('');
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    pixel.fbq(EventType.AddToCart, { quantity: quantity }, { eventID: crypto.randomUUID() });
    setQuantity('');
  }

  function handleLead(event: MouseEvent<HTMLButtonElement>) {
    pixel.fbq(EventType.Lead, { fn: fn, ln: ln }, { eventID: crypto.randomUUID() });
    setFn('')
    setLn('')
  }

  return (
    <div className="container mx-auto py-10">
      <p className="text-3xl font-extralight pb-5">Trigger Events</p>
      <div className="grid grid-cols-3 gap-2">
        <label className="font-semibold my-auto">Quantity</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="e.g. 10"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <label className="font-semibold my-auto">First Name</label>
        <label className="font-semibold my-auto">Last Name</label>
        <div></div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="e.g. John"
          value={fn}
          onChange={(e) => setFn(e.target.value)}
        ></input>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="e.g. Doe"
          value={ln}
          onChange={(e) => setLn(e.target.value)}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={handleLead}
        >
          Lead
        </button>
      </div>
    </div>
  );
}
