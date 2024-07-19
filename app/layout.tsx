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
    localStorage.removeItem('events');

    window.addEventListener('storage', (e) => {
      setEvents(JSON.parse(localStorage.getItem('events') ?? '[]'));
    });

    return () => window.removeEventListener('storage', (e) => setEvents([]));
  }, []);

  return (
    <html lang="en">
      <head>
        <Pixel></Pixel>
      </head>
      <body className={inter.className}>
        <title>Understanding Meta Pixel</title>
        <div className="container mx-auto py-10">
          <div className="flex justify-between">
            <h1 className="text-4xl font-thin pb-5 ">
              Understanding Meta Pixel{path == '/' ? '' : ': '}
              <span className="font-extralight text-blue-500">{route[path]}</span>
            </h1>
            <Link className="my-auto" href="https://github.com/ajilk/pixel" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </Link>
          </div>
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
          {path != '/' && (
            <>
              <h1 className="text-2xl font-thin pt-10">Events</h1>
              <p className="text-gray-500">Triggered events will show up here</p>
              <hr className="mt-2"></hr>
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
            </>
          )}
        </div>
      </body>
    </html>
  );
}
