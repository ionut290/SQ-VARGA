import { CommessaForm } from '@/components/CommessaForm';
import { aggiornaCommessa } from '@/app/actions';
import { prisma } from '@/lib/prisma';

export default async function ModificaCommessaPage({ params }: { params: { id: string } }) {
  const commessa = await prisma.commessa.findUniqueOrThrow({ where: { id: params.id } });

  return (
    <div className="card">
      <h2>Modifica commessa</h2>
      <CommessaForm action={aggiornaCommessa.bind(null, params.id)} commessa={commessa} />
    </div>
  );
}
