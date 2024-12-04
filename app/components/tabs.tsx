// app/components/Tabs.tsx
import Lists from "./lists";
import Calender from "./calender";
import Graph from "./graph";
import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Lists");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Lists":
        return <Lists />;
      case "Calender":
        return <Calender />;
      case "Graph":
        return <Graph />;
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

      <div>{renderTabContent()}</div>
    </div>
  );
}
