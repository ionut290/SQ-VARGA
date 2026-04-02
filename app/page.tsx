import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { eliminaCommessa } from './actions';
import { LABEL_STATI_COMMESSA } from '@/lib/constants';

export default async function Home() {
  const commesse = await prisma.commessa.findMany({
    include: { _count: { select: { cantieri: true } } },
    orderBy: { dataCreazione: 'desc' }
  });

  return (
    <section>
      <div className="card actions">
        <Link href="/commesse/new">+ Nuova commessa</Link>
        <Link href="/commesse">Vai a tutte le commesse</Link>
        <Link href="/mappa">Vai alla mappa cantieri</Link>
      </div>
      <div className="grid">
        {commesse.map((commessa) => (
          <article className="card" key={commessa.id}>
            <h3>{commessa.nomeCommessa}</h3>
            <p>Codice: {commessa.codiceCommessa}</p>
            <p>Cliente: {commessa.cliente}</p>
            <p>Stato: {LABEL_STATI_COMMESSA[commessa.statoCommessa]}</p>
            <p>Cantieri collegati: {commessa._count.cantieri}</p>
            <div className="actions">
              <Link href={`/commesse/${commessa.id}`}>Apri commessa</Link>
              <Link href={`/commesse/${commessa.id}/edit`}>Modifica</Link>
              <form action={eliminaCommessa.bind(null, commessa.id)}>
                <button type="submit">Disattiva</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
