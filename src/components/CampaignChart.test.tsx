import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CampaignChart } from './CampaignChart';
import type { Campaign } from '../schemas/campaign';

// ---------------------------------------------------------------------------
// Task 4 — Tests (do not modify)
// ---------------------------------------------------------------------------

// Mock ApexCharts since it requires a real DOM with canvas support
vi.mock('react-apexcharts', () => ({
  default: (props: { type?: string; series?: unknown }) => (
    <div data-testid="apex-chart" data-type={props.type}>
      {JSON.stringify(props.series)}
    </div>
  ),
}));

const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Campaign A',
    status: 'active',
    platform: 'google',
    budget: 10000,
    spent: 5000,
    impressions: 100000,
    clicks: 3000,
    conversions: 150,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
  },
  {
    id: 'camp-002',
    name: 'Campaign B',
    status: 'completed',
    platform: 'facebook',
    budget: 20000,
    spent: 18000,
    impressions: 200000,
    clicks: 7000,
    conversions: 350,
    startDate: '2026-01-01',
    endDate: '2026-02-28',
  },
];

describe('CampaignChart', () => {
  it('renders the chart heading', () => {
    render(<CampaignChart campaigns={mockCampaigns} />);
    expect(screen.getByText('Campaign Spend Overview')).toBeInTheDocument();
  });

  it('renders an ApexCharts chart element', () => {
    render(<CampaignChart campaigns={mockCampaigns} />);
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('uses bar chart type', () => {
    render(<CampaignChart campaigns={mockCampaigns} />);
    expect(screen.getByTestId('apex-chart')).toHaveAttribute('data-type', 'bar');
  });

  it('includes spend values in the series data', () => {
    render(<CampaignChart campaigns={mockCampaigns} />);
    const chartEl = screen.getByTestId('apex-chart');
    const content = chartEl.textContent ?? '';
    expect(content).toContain('5000');
    expect(content).toContain('18000');
  });
});
