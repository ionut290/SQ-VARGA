import { prisma } from '@/lib/prisma';

declare global {
  // eslint-disable-next-line no-var
  var dbReady: boolean | undefined;
}

export async function ensureDb() {
  if (global.dbReady) return;

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Commessa (
      id TEXT PRIMARY KEY NOT NULL,
      nomeCommessa TEXT NOT NULL,
      codiceCommessa TEXT NOT NULL UNIQUE,
      descrizione TEXT,
      cliente TEXT NOT NULL,
      statoCommessa TEXT NOT NULL DEFAULT 'ATTIVA',
      dataCreazione DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      note TEXT,
      attiva BOOLEAN NOT NULL DEFAULT true
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Cantiere (
      id TEXT PRIMARY KEY NOT NULL,
      commessaId TEXT NOT NULL,
      nomeCantiere TEXT NOT NULL,
      indirizzo TEXT NOT NULL,
      comune TEXT NOT NULL,
      provincia TEXT NOT NULL,
      latitudine REAL NOT NULL,
      longitudine REAL NOT NULL,
      descrizione TEXT,
      statoCantiere TEXT NOT NULL DEFAULT 'PIANIFICATO',
      note TEXT,
      CONSTRAINT Cantiere_commessaId_fkey FOREIGN KEY (commessaId) REFERENCES Commessa (id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);

  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS Commessa_stato_idx ON Commessa(statoCommessa)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS Cantiere_commessa_idx ON Cantiere(commessaId)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS Cantiere_comune_idx ON Cantiere(comune)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS Cantiere_stato_idx ON Cantiere(statoCantiere)`);

  global.dbReady = true;
}
