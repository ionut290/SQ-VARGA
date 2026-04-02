# Gestione Commesse e Cantieri

App web reale e pronta a crescere per gestire **commesse** e **cantieri** con localizzazione GPS su mappa.

## Stack scelto (proposta concreta)
- **Frontend + Backend:** Next.js 14 (App Router, Server Actions)
- **Database ORM:** Prisma
- **Database:** SQLite (rapido per partire, facilmente migrabile a PostgreSQL)
- **Mappa:** Leaflet + OpenStreetMap (nessun costo API iniziale)
- **Linguaggio:** TypeScript

## Struttura progetto

```text
.
├── app/
│   ├── actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── cantieri/
│   │   ├── page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── commesse/
│   │   ├── new/page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── edit/page.tsx
│   └── mappa/page.tsx
├── components/
│   ├── CantiereForm.tsx
│   ├── CommessaForm.tsx
│   └── MappaCantieri.tsx
├── lib/
│   ├── constants.ts
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── .env.example
└── package.json
```

## Schema database

### `commesse`
- `id` (cuid)
- `nomeCommessa`
- `codiceCommessa` (univoco)
- `descrizione`
- `cliente`
- `statoCommessa`
- `dataCreazione`
- `note`
- `attiva`

### `cantieri`
- `id` (cuid)
- `commessaId` (FK -> commesse)
- `nomeCantiere`
- `indirizzo`
- `comune`
- `provincia`
- `latitudine`
- `longitudine`
- `descrizione`
- `statoCantiere`
- `note`

Relazione: **1 commessa -> N cantieri**.

## Pagine principali
- `/` Home con elenco commesse, numero cantieri, link rapidi
- `/commesse/new` Creazione commessa
- `/commesse/[id]` Dettaglio commessa + elenco cantieri + inserimento nuovo cantiere
- `/commesse/[id]/edit` Modifica commessa
- `/cantieri` Elenco cantieri con ricerca e filtri
- `/cantieri/[id]/edit` Modifica cantiere
- `/mappa` Mappa cantieri con filtri per commessa/stato/comune

## Avvio locale

1. Installa dipendenze:
```bash
npm install
```

2. Crea il file ambiente:
```bash
cp .env.example .env
```

3. Genera client Prisma:
```bash
npm run prisma:generate
```

4. Crea database e migrazione:
```bash
npx prisma migrate dev --name init
```

5. (Opzionale) carica dati esempio:
```bash
npm run prisma:seed
```

6. Avvia app:
```bash
npm run dev
```

Apri `http://localhost:3000`.

## Configurazione futura consigliata
- Passare da SQLite a PostgreSQL per ambienti multiutente/produzione
- Aggiungere autenticazione (es. Auth.js)
- Aggiungere audit log e allegati documentali
- Aggiungere validazioni schema con Zod
