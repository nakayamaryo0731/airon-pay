export default function Lists() {
  const mockPayments = [
    { id: 1, description: "Groceries", amount: 3000, date: "2024-12-01" },
    { id: 2, description: "Rent", amount: 70000, date: "2024-12-01" },
    { id: 3, description: "Utilities", amount: 5000, date: "2024-12-02" },
  ];

  return (
    <div className="space-y-4">
      {mockPayments.map((payment) => (
        <div
          key={payment.id}
          className="p-4 bg-white shadow rounded-md flex justify-between"
        >
          <div>
            <div className="font-bold">{payment.description}</div>
            <div className="text-sm text-gray-500">{payment.date}</div>
          </div>
          <div className="font-bold text-orange-500">¥{payment.amount}</div>
        </div>
      ))}
    </div>
  );
}
