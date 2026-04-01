import type { Campaign } from '../schemas/campaign';

interface CampaignStatsProps {
  campaigns: Campaign[];
}

// ---------------------------------------------------------------------------
// Task 2 — Implement the CampaignStats component
// ---------------------------------------------------------------------------
//
// Display four stat cards in a responsive grid:
//
//   "Total Campaigns"  → count of campaigns
//   "Total Spend"      → sum of `spent`, formatted as USD (e.g. "$23,000.00")
//   "Average CTR"      → per-campaign clicks/impressions, averaged, as "3.25%"
//                         Handle empty arrays → "0.00%"
//   "Conversions"      → total conversions across all campaigns
//
// Requirements:
//   - Tailwind CSS for all styling
//   - Responsive grid: 1 col (mobile) → 2 cols (sm) → 4 cols (lg)
//   - Dark mode using dark: variants
//
// Hints:
//   - Currency formatting: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
//   - CTR = clicks / impressions per campaign, then average across campaigns
// ---------------------------------------------------------------------------


interface CampaignStatsProps {
  campaigns: Campaign[];
}

export function CampaignStats({ campaigns }: CampaignStatsProps) {
  const totalCampaigns = campaigns.length;

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);

  const totalConversions = campaigns.reduce(
    (sum, c) => sum + c.conversions,
    0
  );

  const averageCTR =
    campaigns.length === 0
      ? 0
      : campaigns.reduce((sum, c) => sum + c.clicks / c.impressions, 0) /
        campaigns.length;

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Campaigns
        </p>
        <p className="text-2xl font-bold">{totalCampaigns}</p>
      </div>

      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Spend
        </p>
        <p className="text-2xl font-bold">
          {currency.format(totalSpend)}
        </p>
      </div>

      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Average CTR
        </p>
        <p className="text-2xl font-bold">
          {(averageCTR * 100).toFixed(2)}%
        </p>
      </div>

      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Conversions
        </p>
        <p className="text-2xl font-bold">
          {totalConversions === 0 ? "0 conversions" : totalConversions}
        </p>
      </div>

    </div>
  );
}