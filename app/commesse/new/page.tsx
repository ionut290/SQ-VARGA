import { CommessaForm } from '@/components/CommessaForm';
import { creaCommessa } from '@/app/actions';

export default function NuovaCommessaPage() {
  return (
    <div className="card">
      <h2>Nuova commessa</h2>
      <CommessaForm action={creaCommessa} />
    </div>
  );
}
