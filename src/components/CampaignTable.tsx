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

import { useState } from 'react';

type SortKeys = "name" | "status" | "platform" | "budget" | "spent" | "conversions" | "ctr";

export function CampaignTable({ campaigns }: CampaignTableProps) {
  const totalCampaigns = campaigns.length;
  const [field, setField] = useState<SortKeys>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: SortKeys) => {
    setField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if(field === "name") return a.name.localeCompare(b.name);
    if(field === "status") return a.status.localeCompare(b.status);
    if(field === "platform") return a.platform.localeCompare(b.platform);
    if(field === "budget") return a.budget - b.budget;
    if(field === "spent") return a.spent - b.spent;

    if(field === "ctr") {
      const ctrA = a.clicks / a.impressions;
      const ctrB = b.clicks / b.impressions;
      return ctrA - ctrB;
    }

    return 0;
  });
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  if(totalCampaigns === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        No campaigns found
      </div>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("name")}>Name</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("status")}>Status</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("platform")}>Platform</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("budget")}>Budget</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("spent")}>Spent</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("conversions")}>Conversions</th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("ctr")}>CTR</th>
          </tr>
        </thead>

        <tbody>
          {sortedCampaigns.map((c: Campaign, index: number) => {
            const ctr = (c.clicks / c.impressions) * 100;

            return (
              <tr key={index} role="row">
                <td>{c.name}</td>
                <td>{c.status}</td>
                <td>{c.platform}</td>
                <td>{currency.format(c.budget)}</td>
                <td>{currency.format(c.spent)}</td>
                <td>{currency.format(c.conversions)}</td>
                <td>{ctr.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}