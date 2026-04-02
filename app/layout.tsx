import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Gestione Commesse',
  description: 'Gestione commesse e cantieri con mappa GPS'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        <header className="header">
          <h1>Gestione Commesse</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/commesse">Commesse</Link>
            <Link href="/cantieri">Cantieri</Link>
            <Link href="/mappa">Mappa</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
