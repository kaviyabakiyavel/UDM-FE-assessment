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

export function CampaignStats({ campaigns }: CampaignStatsProps) {
  console.log("campaigns",campaigns)
  return <div>TODO: Implement CampaignStats</div>;
}
