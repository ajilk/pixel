'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Pixel from './pixel';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PIXEL_ID } from './constants';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let path = usePathname();
  let [events, setEvents] = useState([]);

  let route: { [key: string]: string } = {
    '/': '',
    '/scroll': 'Scroll',
    '/standard': 'Standard',
    '/custom': 'Custom',
  };

  let routes: { title: string; url: string }[] = [
    { title: 'Home', url: '/' },
    { title: 'Standard', url: '/standard' },
    { title: 'Custom', url: '/custom' },
    { title: 'Scroll', url: '/scroll' },
  ];

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      setEvents(JSON.parse(localStorage.getItem('events') ?? '[]'));
    });
    return () => {
      localStorage.removeItem('events');
      window.removeEventListener('storage', (e) => setEvents([]));
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <Pixel></Pixel>
      </head>
      <body className={inter.className}>
        <title>Understanding Meta Pixel</title>
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-thin pb-5">
            Understanding Meta Pixel{path == '/' ? '' : ': '}
            <span className="font-extralight text-blue-500">{route[path]}</span>
          </h1>
          <div className="pb-5">
            <label>Pixel ID: </label>
            <Link
              href={'https://business.facebook.com/events_manager2/list/dataset/' + PIXEL_ID}
              className="underline text-blue-400"
              target="_blank"
            >
              {PIXEL_ID}
            </Link>
          </div>
          <ul className="flex">
            {routes.map((route) => {
              return (
                <li className="flex-1 mr-5" key={route.title}>
                  <Link
                    className={
                      'text-center block border rounded py-2 px-2 hover:bg-gray-100 ' +
                      (route.url === path ? 'bg-gray-100' : '')
                    }
                    href={route.url}
                  >
                    {route.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="pt-10">{children}</div>
          <h1 className="text-2xl font-thin pt-5">Events</h1>
          <p className="text-gray-500">Triggered events will show up here</p>
          <div className="pt-3">
            {events.map((event, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center w-full p-4 mb-3 bg-white rounded-lg shadow-md border"
                  role="alert"
                >
                  <span className="pe-5">{new Date(Date.now()).toLocaleString()}</span>
                  <pre>{JSON.stringify(event, null, 2)}</pre>
                </div>
              );
            })}
          </div>
        </div>
      </body>
    </html>
  );
}
