import { Commessa } from '@prisma/client';
import { LABEL_STATI_COMMESSA, STATI_COMMESSA } from '@/lib/constants';

type Props = {
  action: (formData: FormData) => void;
  commessa?: Commessa;
};

export function CommessaForm({ action, commessa }: Props) {
  return (
    <form action={action} className="form-grid">
      <input name="nomeCommessa" placeholder="Nome commessa" defaultValue={commessa?.nomeCommessa} required />
      <input name="codiceCommessa" placeholder="Codice commessa" defaultValue={commessa?.codiceCommessa} required />
      <input name="cliente" placeholder="Cliente" defaultValue={commessa?.cliente} required />
      <select name="statoCommessa" defaultValue={commessa?.statoCommessa ?? 'ATTIVA'}>
        {STATI_COMMESSA.map((stato) => (
          <option key={stato} value={stato}>
            {LABEL_STATI_COMMESSA[stato]}
          </option>
        ))}
      </select>
      <textarea name="descrizione" placeholder="Descrizione" defaultValue={commessa?.descrizione ?? ''} />
      <textarea name="note" placeholder="Note" defaultValue={commessa?.note ?? ''} />
      {commessa && (
        <label>
          <input type="checkbox" name="attiva" defaultChecked={commessa.attiva} /> Commessa attiva
        </label>
      )}
      <button type="submit">Salva</button>
    </form>
  );
}
