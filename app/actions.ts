'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { StatoCantiere, StatoCommessa } from '@prisma/client';

export async function creaCommessa(formData: FormData) {
  await prisma.commessa.create({
    data: {
      nomeCommessa: String(formData.get('nomeCommessa')),
      codiceCommessa: String(formData.get('codiceCommessa')),
      descrizione: String(formData.get('descrizione') || ''),
      cliente: String(formData.get('cliente')),
      statoCommessa: formData.get('statoCommessa') as StatoCommessa,
      note: String(formData.get('note') || '')
    }
  });

  revalidatePath('/');
  redirect('/');
}

export async function aggiornaCommessa(id: string, formData: FormData) {
  await prisma.commessa.update({
    where: { id },
    data: {
      nomeCommessa: String(formData.get('nomeCommessa')),
      codiceCommessa: String(formData.get('codiceCommessa')),
      descrizione: String(formData.get('descrizione') || ''),
      cliente: String(formData.get('cliente')),
      statoCommessa: formData.get('statoCommessa') as StatoCommessa,
      note: String(formData.get('note') || ''),
      attiva: formData.get('attiva') === 'on'
    }
  });

  revalidatePath('/');
  revalidatePath(`/commesse/${id}`);
  redirect(`/commesse/${id}`);
}

export async function eliminaCommessa(id: string) {
  await prisma.commessa.update({ where: { id }, data: { attiva: false, statoCommessa: 'DISATTIVATA' } });
  revalidatePath('/');
}

export async function creaCantiere(formData: FormData) {
  const commessaId = String(formData.get('commessaId'));
  await prisma.cantiere.create({
    data: {
      commessaId,
      nomeCantiere: String(formData.get('nomeCantiere')),
      indirizzo: String(formData.get('indirizzo')),
      comune: String(formData.get('comune')),
      provincia: String(formData.get('provincia')),
      latitudine: Number(formData.get('latitudine')),
      longitudine: Number(formData.get('longitudine')),
      descrizione: String(formData.get('descrizione') || ''),
      statoCantiere: formData.get('statoCantiere') as StatoCantiere,
      note: String(formData.get('note') || '')
    }
  });

  revalidatePath(`/commesse/${commessaId}`);
  revalidatePath('/cantieri');
  revalidatePath('/mappa');
  redirect(`/commesse/${commessaId}`);
}

export async function aggiornaCantiere(id: string, formData: FormData) {
  const commessaId = String(formData.get('commessaId'));
  await prisma.cantiere.update({
    where: { id },
    data: {
      nomeCantiere: String(formData.get('nomeCantiere')),
      indirizzo: String(formData.get('indirizzo')),
      comune: String(formData.get('comune')),
      provincia: String(formData.get('provincia')),
      latitudine: Number(formData.get('latitudine')),
      longitudine: Number(formData.get('longitudine')),
      descrizione: String(formData.get('descrizione') || ''),
      statoCantiere: formData.get('statoCantiere') as StatoCantiere,
      note: String(formData.get('note') || '')
    }
  });

  revalidatePath(`/commesse/${commessaId}`);
  revalidatePath('/cantieri');
  revalidatePath('/mappa');
  redirect(`/commesse/${commessaId}`);
}

export async function eliminaCantiere(id: string, commessaId: string) {
  await prisma.cantiere.delete({ where: { id } });
  revalidatePath(`/commesse/${commessaId}`);
  revalidatePath('/cantieri');
  revalidatePath('/mappa');
}
