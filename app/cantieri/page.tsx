import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { LABEL_STATI_CANTIERE } from '@/lib/constants';

type Props = {
  searchParams: {
    q?: string;
    comune?: string;
    stato?: string;
    commessaId?: string;
  };
};

export default async function CantieriPage({ searchParams }: Props) {
  const where = {
    ...(searchParams.q
      ? { nomeCantiere: { contains: searchParams.q, mode: 'insensitive' as const } }
      : {}),
    ...(searchParams.comune ? { comune: searchParams.comune } : {}),
    ...(searchParams.stato ? { statoCantiere: searchParams.stato as never } : {}),
    ...(searchParams.commessaId ? { commessaId: searchParams.commessaId } : {})
  };

  const [cantieri, commesse, comuni] = await Promise.all([
    prisma.cantiere.findMany({ where, include: { commessa: true }, orderBy: { nomeCantiere: 'asc' } }),
    prisma.commessa.findMany({ orderBy: { nomeCommessa: 'asc' } }),
    prisma.cantiere.findMany({ distinct: ['comune'], select: { comune: true }, orderBy: { comune: 'asc' } })
  ]);

  return (
    <section className="grid">
      <form className="card form-grid" method="GET">
        <h2>Filtri cantieri</h2>
        <input name="q" placeholder="Cerca per nome" defaultValue={searchParams.q} />
        <select name="commessaId" defaultValue={searchParams.commessaId ?? ''}>
          <option value="">Tutte le commesse</option>
          {commesse.map((c) => (
            <option key={c.id} value={c.id}>{c.nomeCommessa}</option>
          ))}
        </select>
        <select name="comune" defaultValue={searchParams.comune ?? ''}>
          <option value="">Tutti i comuni</option>
          {comuni.map((c) => (
            <option key={c.comune} value={c.comune}>{c.comune}</option>
          ))}
        </select>
        <select name="stato" defaultValue={searchParams.stato ?? ''}>
          <option value="">Tutti gli stati</option>
          {Object.entries(LABEL_STATI_CANTIERE).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <button type="submit">Applica filtri</button>
      </form>

      <article className="card">
        <h2>Elenco cantieri</h2>
        <table className="table">
          <thead>
            <tr><th>Nome</th><th>Commessa</th><th>Comune</th><th>Stato</th><th>Azioni</th></tr>
          </thead>
          <tbody>
            {cantieri.map((c) => (
              <tr key={c.id}>
                <td>{c.nomeCantiere}</td>
                <td>{c.commessa.nomeCommessa}</td>
                <td>{c.comune}</td>
                <td>{LABEL_STATI_CANTIERE[c.statoCantiere]}</td>
                <td><Link href={`/cantieri/${c.id}/edit`}>Modifica</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
