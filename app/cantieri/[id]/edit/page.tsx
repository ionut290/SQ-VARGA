import { prisma } from '@/lib/prisma';
import { CantiereForm } from '@/components/CantiereForm';
import { aggiornaCantiere } from '@/app/actions';

export default async function ModificaCantierePage({ params }: { params: { id: string } }) {
  const cantiere = await prisma.cantiere.findUniqueOrThrow({ where: { id: params.id } });

  return (
    <div className="card">
      <h2>Modifica cantiere</h2>
      <CantiereForm action={aggiornaCantiere.bind(null, params.id)} commessaId={cantiere.commessaId} cantiere={cantiere} />
    </div>
  );
}
