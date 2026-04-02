import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ensureDb } from '@/lib/ensure-db';
import { CantiereForm } from '@/components/CantiereForm';
import { creaCantiere, eliminaCantiere } from '@/app/actions';
import { LABEL_STATI_CANTIERE, LABEL_STATI_COMMESSA } from '@/lib/constants';

export default async function CommessaDettaglioPage({ params }: { params: { id: string } }) {
  await ensureDb();
  const commessa = await prisma.commessa.findUnique({
    where: { id: params.id },
    include: { cantieri: { orderBy: { nomeCantiere: 'asc' } } }
  });

  if (!commessa) notFound();

  return (
    <section className="grid">
      <article className="card">
        <h2>{commessa.nomeCommessa}</h2>
        <p>Codice: {commessa.codiceCommessa}</p>
        <p>Cliente: {commessa.cliente}</p>
        <p>Stato: {LABEL_STATI_COMMESSA[commessa.statoCommessa]}</p>
        <p>Descrizione: {commessa.descrizione || 'N/D'}</p>
        <p>Note: {commessa.note || 'N/D'}</p>
        <div className="actions">
          <Link href={`/mappa?commessaId=${commessa.id}`}>Vedi i cantieri in mappa</Link>
          <Link href={`/commesse/${commessa.id}/edit`}>Modifica commessa</Link>
        </div>
      </article>

      <article className="card">
        <h3>Nuovo cantiere</h3>
        <CantiereForm action={creaCantiere} commessaId={commessa.id} />
      </article>

      <article className="card">
        <h3>Cantieri collegati</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Comune</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {commessa.cantieri.map((cantiere) => (
              <tr key={cantiere.id}>
                <td>{cantiere.nomeCantiere}</td>
                <td>{cantiere.comune}</td>
                <td>{LABEL_STATI_CANTIERE[cantiere.statoCantiere]}</td>
                <td className="actions">
                  <Link href={`/cantieri/${cantiere.id}/edit`}>Modifica</Link>
                  <form action={eliminaCantiere.bind(null, cantiere.id, commessa.id)}>
                    <button type="submit">Elimina</button>
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
