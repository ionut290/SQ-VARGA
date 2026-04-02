import { Cantiere } from '@prisma/client';
import { LABEL_STATI_CANTIERE, STATI_CANTIERE } from '@/lib/constants';

type Props = {
  action: (formData: FormData) => void;
  commessaId: string;
  cantiere?: Cantiere;
};

export function CantiereForm({ action, commessaId, cantiere }: Props) {
  return (
    <form action={action} className="form-grid">
      <input type="hidden" name="commessaId" value={commessaId} />
      <input name="nomeCantiere" placeholder="Nome cantiere" defaultValue={cantiere?.nomeCantiere} required />
      <input name="indirizzo" placeholder="Indirizzo" defaultValue={cantiere?.indirizzo} required />
      <input name="comune" placeholder="Comune" defaultValue={cantiere?.comune} required />
      <input name="provincia" placeholder="Provincia" defaultValue={cantiere?.provincia} required />
      <input name="latitudine" type="number" step="0.000001" placeholder="Latitudine" defaultValue={cantiere?.latitudine} required />
      <input name="longitudine" type="number" step="0.000001" placeholder="Longitudine" defaultValue={cantiere?.longitudine} required />
      <select name="statoCantiere" defaultValue={cantiere?.statoCantiere ?? 'PIANIFICATO'}>
        {STATI_CANTIERE.map((stato) => (
          <option key={stato} value={stato}>
            {LABEL_STATI_CANTIERE[stato]}
          </option>
        ))}
      </select>
      <textarea name="descrizione" placeholder="Descrizione" defaultValue={cantiere?.descrizione ?? ''} />
      <textarea name="note" placeholder="Note" defaultValue={cantiere?.note ?? ''} />
      <button type="submit">Salva cantiere</button>
    </form>
  );
}
