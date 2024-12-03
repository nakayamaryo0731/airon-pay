import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

// Loader: Group, GroupMember, Payment, Currencyを取得
export const loader: LoaderFunction = async () => {
  try {
    const groups = await db.group.findMany({
      include: {
        members: {
          include: { user: true },
        },
        payments: {
          include: {
            payer: true,
            category: true,
            currency: true,
          },
        },
      },
    });

    return json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Response("Failed to load groups", { status: 500 });
  }
};

// UI: ホーム画面
export default function PlaygroundPage() {
  const { groups } = useLoaderData<{
    groups: {
      id: number;
      name: string;
      description: string | null;
      members: { user: { name: string }; role: string }[];
      payments: {
        id: number;
        amount: number;
        currency: { code: string };
        exchangeRate: number | null;
        description: string | null;
        category: { name: string };
        payer: { name: string };
        paidAt: string;
      }[];
    }[];
  }>();

  if (!groups || groups.length === 0) {
    return <div className="p-6 text-gray-500">No groups found.</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>
      {groups.map((group) => (
        <div
          key={group.id}
          className="bg-white shadow-lg rounded-lg mb-6 p-6 border border-gray-200"
        >
          {/* グループ情報 */}
          <h2 className="text-2xl font-semibold text-gray-800">{group.name}</h2>
          <p className="text-gray-600 mt-2">
            {group.description || "No description provided."}
          </p>

          {/* メンバーセクション */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Members</h3>
            <ul className="space-y-2">
              {group.members.map((member) => (
                <li
                  key={member.user.name}
                  className="flex items-center space-x-3 bg-gray-100 rounded-lg p-3"
                >
                  <div className="font-medium text-gray-700">
                    {member.user.name}
                  </div>
                  <div className="text-sm text-gray-500">({member.role})</div>
                </li>
              ))}
            </ul>
          </div>

          {/* 支払いセクション */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Payments</h3>
            <ul className="space-y-4">
              {group.payments.map((payment) => (
                <li
                  key={payment.id}
                  className="bg-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-gray-800">
                        {payment.payer.name}
                      </span>{" "}
                      <span className="text-gray-600">
                        paid {payment.amount.toFixed(2)} {payment.currency.code}
                      </span>
                      {payment.exchangeRate && (
                        <span className="text-sm text-gray-500">
                          {" "}
                          (Exchange Rate: {payment.exchangeRate.toFixed(2)})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </div>
                  </div>
                  {payment.description && (
                    <p className="mt-2 text-gray-700 text-sm">
                      {payment.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
