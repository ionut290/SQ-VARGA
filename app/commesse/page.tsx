import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ensureDb } from '@/lib/ensure-db';
import { LABEL_STATI_COMMESSA } from '@/lib/constants';
import { eliminaCommessa } from '@/app/actions';

export default async function CommessePage() {
  await ensureDb();
  const commesse = await prisma.commessa.findMany({
    include: { _count: { select: { cantieri: true } } },
    orderBy: { dataCreazione: 'desc' }
  });

  return (
    <section className="grid">
      <div className="card actions">
        <Link href="/commesse/new">+ Nuova commessa</Link>
        <Link href="/mappa">Apri mappa cantieri</Link>
      </div>
      <article className="card">
        <h2>Elenco commesse</h2>
        <table className="table">
          <thead>
            <tr><th>Nome</th><th>Codice</th><th>Cliente</th><th>Stato</th><th>Cantieri</th><th>Azioni</th></tr>
          </thead>
          <tbody>
            {commesse.map((commessa) => (
              <tr key={commessa.id}>
                <td>{commessa.nomeCommessa}</td>
                <td>{commessa.codiceCommessa}</td>
                <td>{commessa.cliente}</td>
                <td>{LABEL_STATI_COMMESSA[commessa.statoCommessa]}</td>
                <td>{commessa._count.cantieri}</td>
                <td className="actions">
                  <Link href={`/commesse/${commessa.id}`}>Apri</Link>
                  <Link href={`/commesse/${commessa.id}/edit`}>Modifica</Link>
                  <form action={eliminaCommessa.bind(null, commessa.id)}>
                    <button type="submit">Disattiva</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
