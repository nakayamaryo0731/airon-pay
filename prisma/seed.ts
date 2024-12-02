import { PrismaClient } from "@prisma/client";
import {
  categories,
  tags,
  users,
  groups,
  groupMembers,
  payments,
  currencies,
} from "./fixtures";

const db = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // カテゴリの挿入
  await db.category.createMany({ data: categories });
  console.log(`Seeded ${categories.length} categories.`);

  // タグの挿入
  await db.tag.createMany({ data: tags });
  console.log(`Seeded ${tags.length} tags.`);

  // ユーザーの挿入
  const userMap: { [key: string]: number } = {};
  for (const user of users) {
    const createdUser = await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    userMap[user.email] = createdUser.id;
  }
  console.log(`Seeded ${users.length} users.`);

  // グループの挿入
  const groupMap: { [key: string]: number } = {};
  for (const group of groups) {
    const createdGroup = await db.group.create({
      data: group,
    });
    groupMap[group.name] = createdGroup.id;
  }
  console.log(`Seeded ${groups.length} groups.`);

  // グループメンバーの挿入
  for (const member of groupMembers) {
    await db.groupMember.create({
      data: {
        groupId: groupMap[member.groupName],
        userId: userMap[member.userEmail],
        role: member.role,
      },
    });
  }
  console.log(`Seeded ${groupMembers.length} group members.`);

  // 支払いの挿入
  const categoryMap: { [key: string]: number } = {};
  for (const category of categories) {
    const createdCategory = await db.category.findFirstOrThrow({
      where: { name: category.name },
    });
    categoryMap[category.name] = createdCategory.id;
  }

  const tagMap: { [key: string]: number } = {};
  for (const tag of tags) {
    const createdTag = await db.tag.findFirstOrThrow({
      where: { name: tag.name },
    });
    tagMap[tag.name] = createdTag.id;
  }

  // 通貨マスタデータの挿入
  const currencyMap: { [key: string]: number } = {};
  for (const currency of currencies) {
    const createdCurrency = await db.currency.upsert({
      where: { code: currency.code },
      update: {},
      create: currency,
    });
    currencyMap[currency.code] = createdCurrency.id;
  }

    // 支払いデータの挿入
  for (const payment of payments) {
    await db.payment.create({
      data: {
        groupId: groupMap[payment.groupName],
        payerId: userMap[payment.payerEmail],
        amount: payment.amount,
        currencyId: currencyMap[payment.currencyCode], // 通貨IDをマッピング
        exchangeRate: payment.exchangeRate,
        categoryId: categoryMap[payment.categoryName],
        description: payment.description,
        splits: {
          create: payment.splits.map(split => ({
            userId: userMap[split.userEmail],
            amount: split.amount,
          })),
        },
        tags: {
          create: payment.tags.map(tagName => ({
            tagId: tagMap[tagName],
          })),
        },
      },
    });
  }
}

main()
  .catch(e => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
