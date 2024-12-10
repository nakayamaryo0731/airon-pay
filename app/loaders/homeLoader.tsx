import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { db } from "~/db.server";
import type { Payment } from "~/types";

type LoaderData = {
  payments: Payment[];
};

export const homeLoader: LoaderFunction = async () => {
  const payments = await db.payment.findMany({
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedPayments = payments.map((payment) => ({
    id: payment.id,
    description: payment.description ?? "",
    amount: payment.amount,
    date: payment.createdAt.toISOString().split("T")[0],
    categoryName: payment.category.name,
    tags: payment.tags.map((t) => t.tag.name),
  }));

  return json<LoaderData>({ payments: formattedPayments });
};
