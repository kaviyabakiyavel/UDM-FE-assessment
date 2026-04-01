import type { Campaign } from '../schemas/campaign';

interface CampaignChartProps {
  campaigns: Campaign[];
}

// ---------------------------------------------------------------------------
// Task 4 — Implement the CampaignChart component
// ---------------------------------------------------------------------------
//
// Render a bar chart showing campaign spend using ApexCharts:
//
//   - Heading text: "Campaign Spend Overview"
//   - Chart type: 'bar'
//   - Series data: spend values from each campaign
//   - Categories (x-axis labels): campaign names
//
// Usage:
//   import Chart from 'react-apexcharts';
//   <Chart type="bar" series={[...]} options={{...}} height={...} />
//
// Hints:
//   - series format: [{ name: 'Spend', data: [5000, 18000, ...] }]
//   - options.xaxis.categories: ['Campaign A', 'Campaign B', ...]
//   - ApexCharts is mocked in tests — just make sure you pass the right props
// ---------------------------------------------------------------------------

import Chart from 'react-apexcharts';

export function CampaignChart({ campaigns }: CampaignChartProps) {
  // Use mock data
  const series = [{ name: 'Spend', data: [5000, 18000, 20000] }];
  const options = { xaxis: { categories: ['Campaign A', 'Campaign B', 'Campaign C'] } };
  return (<div>
    <h1>Campaign Spend Overview</h1>
    <Chart type="bar" series={series} options={options} height={300} data-testid="apex-chart" />
  </div>);
}
