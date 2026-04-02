const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const commessa = await prisma.commessa.upsert({
    where: { codiceCommessa: 'COM-001' },
    update: {},
    create: {
      nomeCommessa: 'Riqualificazione Nord',
      codiceCommessa: 'COM-001',
      descrizione: 'Interventi di ammodernamento infrastrutture',
      cliente: 'Comune di Torino',
      note: 'Priorità alta'
    }
  });

  await prisma.cantiere.createMany({
    data: [
      {
        commessaId: commessa.id,
        nomeCantiere: 'Cantiere Via Roma',
        indirizzo: 'Via Roma 10',
        comune: 'Torino',
        provincia: 'TO',
        latitudine: 45.0703,
        longitudine: 7.6869,
        statoCantiere: 'IN_CORSO',
        descrizione: 'Rifacimento pavimentazione'
      },
      {
        commessaId: commessa.id,
        nomeCantiere: 'Cantiere Corso Francia',
        indirizzo: 'Corso Francia 55',
        comune: 'Torino',
        provincia: 'TO',
        latitudine: 45.0826,
        longitudine: 7.6507,
        statoCantiere: 'PIANIFICATO'
      }
    ],
    skipDuplicates: true
  });
}

main().finally(() => prisma.$disconnect());
