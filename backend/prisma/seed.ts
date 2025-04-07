import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  const mesas = [
    {
      "id": "d5786144-eaa5-4e66-8b83-80f90021e46e",
      "nome": "Mesa 01"
    },
    {
      "id": "b9ebcd11-24e6-4f5a-b0f0-8681b668c041",
      "nome": "Mesa 02"
    },
    {
      "id": "61bee473-3bff-481a-821d-8ad21ba72df7",
      "nome": "Mesa 03"
    },
    {
      "id": "25aee0a2-825f-49b7-9228-4e3b08017dc3",
      "nome": "Mesa 04"
    },
    {
      "id": "48ae0867-e46b-4a32-bf8a-b3b4d54b7104",
      "nome": "Mesa 05"
    },
    {
      "id": "939beac1-051f-4e3d-832c-f9443b709f8f",
      "nome": "Mesa 06"
    },
    {
      "id": "ef918bbe-5cb7-4fa4-95a0-f0148b3a74bd",
      "nome": "Mesa 07"
    },
    {
      "id": "0dea95e0-3079-4d00-9848-b84aade41270",
      "nome": "Mesa 08"
    },
    {
      "id": "7d6a2261-da20-48ad-9b4d-da43a95a4116",
      "nome": "Mesa 09"
    },
    {
      "id": "9044a96e-b721-4a24-9a83-225dbbf51ac8",
      "nome": "Mesa 10"
    },
    {
      "id": "ff7fac67-c498-4841-b6a8-f3890d2cfe05",
      "nome": "Mesa 11"
    },
    {
      "id": "426334b5-bb84-4707-9ff0-5499cdebd976",
      "nome": "Mesa 12"
    },
    {
      "id": "15207770-1226-4b95-a48e-af799c12d759",
      "nome": "Mesa 13"
    },
    {
      "id": "ff177c8f-7f1a-432c-8cdd-fdcbc6f0a28c",
      "nome": "Mesa 14"
    },
    {
      "id": "970cb77a-d3b4-4c8f-a4ea-bd3ed4227b29",
      "nome": "Mesa 15"
    }
  ];

  for (const mesa of mesas) {
    await prisma.mesa.upsert({
      where: { id: mesa.id },
      update: {},
      create: mesa,
    });
  }

  console.log("Mesas inseridas no banco de dados!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });