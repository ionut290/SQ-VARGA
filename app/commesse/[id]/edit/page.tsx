import { notFound } from 'next/navigation';
import { CommessaForm } from '@/components/CommessaForm';
import { aggiornaCommessa } from '@/app/actions';
import { prisma } from '@/lib/prisma';
import { ensureDb } from '@/lib/ensure-db';

export default async function ModificaCommessaPage({ params }: { params: { id: string } }) {
  await ensureDb();
  const commessa = await prisma.commessa.findUnique({ where: { id: params.id } });
  if (!commessa) notFound();

  return (
    <div className="card">
      <h2>Modifica commessa</h2>
      <CommessaForm action={aggiornaCommessa.bind(null, params.id)} commessa={commessa} />
    </div>
  );
}
