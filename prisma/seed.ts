import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // カテゴリマスタデータ
  const categories = await db.category.createMany({
    data: [
      { name: "Groceries" },
      { name: "Utilities" },
      { name: "Entertainment" },
      { name: "Transport" },
    ],
  });

  console.log(`Seeded ${categories.count} categories.`);

  // タグマスタデータ
  const tags = await db.tag.createMany({
    data: [
      { name: "Urgent" },
      { name: "Work" },
      { name: "Personal" },
      { name: "Recurring" },
    ],
  });

  console.log(`Seeded ${tags.count} tags.`);

  // サンプルユーザー
  const alice = await db.user.create({
    data: { name: "Alice", email: "alice@example.com" },
  });

  const bob = await db.user.create({
    data: { name: "Bob", email: "bob@example.com" },
  });

  console.log(`Seeded users: ${alice.name}, ${bob.name}.`);

  // サンプルグループ
  const group = await db.group.create({
    data: {
      name: "Household",
      description: "Shared household expenses",
      members: {
        create: [
          { userId: alice.id, role: "owner" },
          { userId: bob.id, role: "member" },
        ],
      },
    },
  });

  console.log(`Seeded group: ${group.name}.`);

  // サンプル支払い
  const payment = await db.payment.create({
    data: {
      groupId: group.id,
      payerId: alice.id,
      amount: 100.0,
      categoryId: 1, // Groceries
      description: "Weekly grocery shopping",
      splits: {
        create: [
          { userId: alice.id, amount: 60.0 },
          { userId: bob.id, amount: 40.0 },
        ],
      },
      tags: {
        create: [
          { tagId: 1 }, // Urgent
          { tagId: 4 }, // Recurring
        ],
      },
    },
  });

  console.log(`Seeded payment: ${payment.description}.`);
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
