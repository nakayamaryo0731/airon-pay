import { useLoaderData } from "@remix-run/react";
import { homeLoader } from "~/loaders/homeLoader";
import Tabs from "~/components/tabs";
import type { Payment } from "~/types";

export const loader = homeLoader;

export default function Home() {
  const { payments } = useLoaderData<{ payments: Payment[] }>();

  return (
    <div className="p-4 bg-gray-50 h-full">
      <Tabs payments={payments} />
    </div>
  );
}
