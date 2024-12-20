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
const defaultCreatedByUserId = 1;

async function main() {
  console.log("Seeding data...");

  // ユーザーの挿入
  const userMap = new Map<string, number>();
  for (const user of users) {
    const createdUser = await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    userMap.set(user.email, createdUser.id);
  }
  console.log(`Seeded ${users.length} users.`);

  // カテゴリの挿入
  const categoryMap = new Map<string, number>();
  for (const category of categories) {
    const createdCategory = await db.category.upsert({
      where: { name: category.name },
      update: {},
      create: { ...category, createdByUserId: defaultCreatedByUserId },
    });
    categoryMap.set(category.name, createdCategory.id);
  }
  console.log(`Seeded ${categories.length} categories.`);

  // グループの挿入
  const groupMap = new Map<string, number>();
  for (const group of groups) {
    const createdGroup = await db.group.upsert({
      where: { name: group.name },
      update: {},
      create: { ...group, createdByUserId: defaultCreatedByUserId },
    });
    groupMap.set(group.name, createdGroup.id);
  }
  console.log(`Seeded ${groups.length} groups.`);

  // グループメンバーの挿入
  for (const member of groupMembers) {
    await db.groupMember.upsert({
      where: {
        groupId_userId: {
          groupId: groupMap.get(member.groupName)!,
          userId: userMap.get(member.userEmail)!,
        },
      },
      update: {},
      create: {
        groupId: groupMap.get(member.groupName)!,
        userId: userMap.get(member.userEmail)!,
        role: member.role,
      },
    });
  }
  console.log(`Seeded ${groupMembers.length} group members.`);

  // 通貨の挿入
  const currencyMap = new Map<string, number>();
  for (const currency of currencies) {
    const createdCurrency = await db.currency.upsert({
      where: { code: currency.code },
      update: {},
      create: currency,
    });
    currencyMap.set(currency.code, createdCurrency.id);
  }
  console.log(`Seeded ${currencies.length} currencies.`);

  // タグの挿入
  const tagMap = new Map<string, number>();
  for (const tag of tags) {
    const createdTag = await db.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: { ...tag, createdByUserId: defaultCreatedByUserId },
    });
    tagMap.set(tag.name, createdTag.id);
  }
  console.log(`Seeded ${tags.length} tags.`);

  // 支払いデータの挿入
  for (const payment of payments) {
    await db.payment.upsert({
      where: { id: payment.id },
      update: {},
      create: {
        groupId: groupMap.get(payment.groupName)!,
        payerId: userMap.get(payment.payerEmail)!,
        amount: payment.amount,
        currencyId: currencyMap.get(payment.currencyCode)!,
        exchangeRate: payment.exchangeRate,
        categoryId: categoryMap.get(payment.categoryName)!,
        description: payment.description,
        splits: {
          create: payment.splits.map((split) => ({
            userId: userMap.get(split.userEmail)!,
            amount: split.amount,
          })),
        },
        tags: {
          create: payment.tags.map((tagName) => ({
            tagId: tagMap.get(tagName)!,
          })),
        },
      },
    });
  }
  console.log(`Seeded ${payments.length} payments.`);
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
