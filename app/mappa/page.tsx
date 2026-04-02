import dynamic from 'next/dynamic';
import { prisma } from '@/lib/prisma';
import { LABEL_STATI_CANTIERE } from '@/lib/constants';

const MappaCantieri = dynamic(() => import('@/components/MappaCantieri').then((m) => m.MappaCantieri), {
  ssr: false
});

type Props = {
  searchParams: {
    commessaId?: string;
    stato?: string;
    comune?: string;
  };
};

export default async function MappaPage({ searchParams }: Props) {
  const where = {
    ...(searchParams.commessaId ? { commessaId: searchParams.commessaId } : {}),
    ...(searchParams.stato ? { statoCantiere: searchParams.stato as never } : {}),
    ...(searchParams.comune ? { comune: searchParams.comune } : {})
  };

  const [cantieri, commesse, comuni] = await Promise.all([
    prisma.cantiere.findMany({ where, include: { commessa: true } }),
    prisma.commessa.findMany({ orderBy: { nomeCommessa: 'asc' } }),
    prisma.cantiere.findMany({ distinct: ['comune'], select: { comune: true }, orderBy: { comune: 'asc' } })
  ]);

  return (
    <section className="grid">
      <form method="GET" className="card form-grid">
        <h2>Filtri mappa</h2>
        <select name="commessaId" defaultValue={searchParams.commessaId ?? ''}>
          <option value="">Tutte le commesse</option>
          {commesse.map((c) => (
            <option key={c.id} value={c.id}>{c.nomeCommessa}</option>
          ))}
        </select>
        <select name="stato" defaultValue={searchParams.stato ?? ''}>
          <option value="">Tutti gli stati</option>
          {Object.entries(LABEL_STATI_CANTIERE).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <select name="comune" defaultValue={searchParams.comune ?? ''}>
          <option value="">Tutti i comuni</option>
          {comuni.map((c) => <option key={c.comune} value={c.comune}>{c.comune}</option>)}
        </select>
        <button type="submit">Aggiorna mappa</button>
      </form>

      <div className="card">
        <h2>Mappa cantieri ({cantieri.length})</h2>
        <MappaCantieri
          cantieri={cantieri.map((c) => ({
            id: c.id,
            nomeCantiere: c.nomeCantiere,
            nomeCommessa: c.commessa.nomeCommessa,
            indirizzo: c.indirizzo,
            comune: c.comune,
            statoCantiere: c.statoCantiere,
            latitudine: c.latitudine,
            longitudine: c.longitudine
          }))}
        />
      </div>
    </section>
  );
}
