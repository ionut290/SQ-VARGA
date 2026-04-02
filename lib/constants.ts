export const STATI_COMMESSA = ['ATTIVA', 'SOSPESA', 'CHIUSA', 'DISATTIVATA'] as const;
export const STATI_CANTIERE = ['PIANIFICATO', 'IN_CORSO', 'COMPLETATO', 'BLOCCATO'] as const;

export const LABEL_STATI_CANTIERE: Record<string, string> = {
  PIANIFICATO: 'Pianificato',
  IN_CORSO: 'In corso',
  COMPLETATO: 'Completato',
  BLOCCATO: 'Bloccato'
};

export const LABEL_STATI_COMMESSA: Record<string, string> = {
  ATTIVA: 'Attiva',
  SOSPESA: 'Sospesa',
  CHIUSA: 'Chiusa',
  DISATTIVATA: 'Disattivata'
};
