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

export const payments = [
  {
    groupName: "Household",
    payerEmail: "alice@example.com",
    amount: 100.0,
    categoryName: "Groceries",
    description: "Weekly grocery shopping",
    splits: [
      { userEmail: "alice@example.com", amount: 60.0 },
      { userEmail: "bob@example.com", amount: 40.0 },
    ],
    tags: ["Urgent", "Recurring"],
  },
];
