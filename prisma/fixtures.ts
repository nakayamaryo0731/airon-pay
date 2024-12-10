export const categories = [
  { name: "Groceries" },
  { name: "Utilities" },
  { name: "Entertainment" },
  { name: "Transport" },
];

export const tags = [
  { name: "Urgent" },
  { name: "Work" },
  { name: "Personal" },
  { name: "Recurring" },
];

export const users = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

export const groups = [
  { name: "Household", description: "Shared household expenses" },
];

export const groupMembers = [
  { groupName: "Household", userEmail: "alice@example.com", role: "owner" },
  { groupName: "Household", userEmail: "bob@example.com", role: "member" },
];

export const currencies = [
  { code: "USD", name: "Dollar (US)" },
  { code: "JPY", name: "Yen (JP)" },
  { code: "EUR", name: "Euro" },
];

export const payments = [
  {
    id: 1,
    groupName: "Household",
    payerEmail: "alice@example.com",
    amount: 100.0,
    currencyCode: "USD",
    exchangeRate: 110.5,
    categoryName: "Groceries",
    description: "Weekly grocery shopping",
    splits: [
      { userEmail: "alice@example.com", amount: 60.0 },
      { userEmail: "bob@example.com", amount: 40.0 },
    ],
    tags: ["Urgent", "Recurring"],
  },
  {
    id: 2,
    groupName: "Household",
    payerEmail: "bob@example.com",
    amount: 200.0,
    currencyCode: "JPY",
    exchangeRate: 1.0,
    categoryName: "Utilities",
    description: "Monthly utility bills",
    splits: [
      { userEmail: "alice@example.com", amount: 100.0 },
      { userEmail: "bob@example.com", amount: 100.0 },
    ],
    tags: ["Work", "Recurring"],
  },
  {
    id: 3,
    groupName: "Household",
    payerEmail: "alice@example.com",
    amount: 50.0,
    currencyCode: "EUR",
    exchangeRate: 130.0,
    categoryName: "Transport",
    description: "Taxi fare for group outing",
    splits: [
      { userEmail: "alice@example.com", amount: 25.0 },
      { userEmail: "bob@example.com", amount: 25.0 },
    ],
    tags: ["Personal"],
  },
];
