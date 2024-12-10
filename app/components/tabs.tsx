import { useState } from "react";
import Lists from "./lists";
import { Payment } from "../types";

export default function Tabs({ payments }: { payments: Payment[] }) {
  const [activeTab, setActiveTab] = useState("Lists");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Lists":
        return <Lists payments={payments} />;
      case "Calender":
        return <div>Calender View Coming Soon!</div>;
      case "Graph":
        return <div>Graph View Coming Soon!</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b-2 pb-2 mb-4">
        <button
          onClick={() => setActiveTab("Lists")}
          className={`${
            activeTab === "Lists" ? "text-orange-500 border-orange-500" : ""
          } border-b-2 pb-2`}
        >
          Lists
        </button>
        <button
          onClick={() => setActiveTab("Calender")}
          className={`${
            activeTab === "Calender" ? "text-orange-500 border-orange-500" : ""
          } border-b-2 pb-2`}
        >
          Calender
        </button>
        <button
          onClick={() => setActiveTab("Graph")}
          className={`${
            activeTab === "Graph" ? "text-orange-500 border-orange-500" : ""
          } border-b-2 pb-2`}
        >
          Graph
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
}
