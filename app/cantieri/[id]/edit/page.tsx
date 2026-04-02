import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ensureDb } from '@/lib/ensure-db';
import { CantiereForm } from '@/components/CantiereForm';
import { aggiornaCantiere } from '@/app/actions';

export default async function ModificaCantierePage({ params }: { params: { id: string } }) {
  await ensureDb();
  const cantiere = await prisma.cantiere.findUnique({ where: { id: params.id } });
  if (!cantiere) notFound();

  return (
    <div className="card">
      <h2>Modifica cantiere</h2>
      <CantiereForm action={aggiornaCantiere.bind(null, params.id)} commessaId={cantiere.commessaId} cantiere={cantiere} />
    </div>
  );
}
