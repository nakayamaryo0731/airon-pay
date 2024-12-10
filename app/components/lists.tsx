import { Payment } from "../types";

export default function Lists({ payments }: { payments: Payment[] }) {
  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 bg-white shadow rounded-md flex justify-between"
          >
            <div>
              <div className="font-bold">{payment.description}</div>
              <div className="text-sm text-gray-500">{payment.date}</div>
              <div className="text-sm text-gray-500">
                Category: {payment.categoryName}
              </div>
              <div className="text-sm text-gray-500">
                Tags: {payment.tags.join(", ")}
              </div>
            </div>
            <div className="font-bold text-orange-500">¥{payment.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
