import type { Campaign } from '../schemas/campaign';

interface CampaignTableProps {
  campaigns: Campaign[];
}

// ---------------------------------------------------------------------------
// Task 3b — Implement the CampaignTable component
// ---------------------------------------------------------------------------
//
// Render a data table with the following columns:
//
//   Name      plain text
//   Status    'active' | 'paused' | 'completed'
//   Platform  plain text
//   Budget    currency format ($10,000.00)
//   Spent     currency format ($5,000.00)
//   CTR       percentage (clicks / impressions × 100), e.g. "3.00%"
//
// Behaviour:
//   - Clicking a column header sorts rows by that column (ascending)
//   - When campaigns array is empty, render "No campaigns found"
//
// Requirements:
//   - Use Tailwind CSS for styling
//   - Support dark mode
//   - Use <table>, <thead>, <tbody>, <tr>, <th>, <td> elements
//   - Use semantic role="row" on rows (native table rows have this by default)
//
// Hints:
//   - useState for sort state
//   - [...campaigns].sort() to avoid mutating props
//   - Currency: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
// ---------------------------------------------------------------------------

import { useState } from "react";

interface CampaignTableProps {
  campaigns: Campaign[];
}

type SortKeys =
  | "name"
  | "status"
  | "platform"
  | "budget"
  | "spent"
  | "ctr"
  | "conversions";

export function CampaignTable({ campaigns }: CampaignTableProps) {
  const [field, setField] = useState<SortKeys>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKeys) => {
    if(field === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setField(key);
      setSortOrder("asc");
    }
  };

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Sort campaigns based on current field and order
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let result = 0;

    switch(field) {
      case "name":
        result = a.name.localeCompare(b.name);
        break;
      case "status":
        result = a.status.localeCompare(b.status);
        break;
      case "platform":
        result = a.platform.localeCompare(b.platform);
        break;
      case "budget":
        result = a.budget - b.budget;
        break;
      case "spent":
        result = a.spent - b.spent;
        break;
      case "conversions":
        result = a.conversions - b.conversions;
        break;
      case "ctr":
        const ctrA = a.impressions ? a.clicks / a.impressions : 0;
        const ctrB = b.impressions ? b.clicks / b.impressions : 0;
        result = ctrA - ctrB;
        break;
    }

    return sortOrder === "asc" ? result : -result;
  });

  if(campaigns.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No campaigns found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th
              onClick={() => handleSort("name")}
              className="p-2 cursor-pointer text-left"
            >
              Name
            </th>
            <th
              onClick={() => handleSort("status")}
              className="p-2 cursor-pointer text-left"
            >
              Status
            </th>
            <th
              onClick={() => handleSort("platform")}
              className="p-2 cursor-pointer text-left"
            >
              Platform
            </th>
            <th
              onClick={() => handleSort("budget")}
              className="p-2 cursor-pointer text-left"
            >
              Budget
            </th>
            <th
              onClick={() => handleSort("spent")}
              className="p-2 cursor-pointer text-left"
            >
              Spent
            </th>
            <th
              onClick={() => handleSort("conversions")}
              className="p-2 cursor-pointer text-left"
            >
              Conversions
            </th>
            <th
              onClick={() => handleSort("ctr")}
              className="p-2 cursor-pointer text-left"
            >
              CTR
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedCampaigns.map((c) => {
            const ctr = c.impressions ? (c.clicks / c.impressions) * 100 : 0;

            return (
              <tr
                key={c.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.status}</td>
                <td className="p-2">{c.platform}</td>
                <td className="p-2">{currency.format(c.budget)}</td>
                <td className="p-2">{currency.format(c.spent)}</td>
                <td className="p-2">{c.conversions}</td>
                <td className="p-2">{ctr.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}