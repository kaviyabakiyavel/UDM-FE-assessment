import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CampaignTable } from './CampaignTable';
import type { Campaign } from '../schemas/campaign';

// ---------------------------------------------------------------------------
// Task 3b — Tests (do not modify)
// ---------------------------------------------------------------------------

const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Alpha Campaign',
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
    name: 'Beta Campaign',
    status: 'paused',
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

describe('CampaignTable', () => {
  it('renders table headers', () => {
    render(<CampaignTable campaigns={mockCampaigns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
    expect(screen.getByText('Spent')).toBeInTheDocument();
    expect(screen.getByText('CTR')).toBeInTheDocument();
  });

  it('renders campaign data in rows', () => {
    render(<CampaignTable campaigns={mockCampaigns} />);
    expect(screen.getByText('Alpha Campaign')).toBeInTheDocument();
    expect(screen.getByText('Beta Campaign')).toBeInTheDocument();
  });

  it('displays campaign status values', () => {
    render(<CampaignTable campaigns={mockCampaigns} />);
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('paused')).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(<CampaignTable campaigns={mockCampaigns} />);
    expect(screen.getByText('$10,000.00')).toBeInTheDocument();
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
  });

  it('sorts by name when the Name header is clicked', async () => {
    const user = userEvent.setup();
    render(<CampaignTable campaigns={mockCampaigns} />);

    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    const rows = screen.getAllByRole('row');
    // Header row + 2 data rows
    expect(rows).toHaveLength(3);
    // First data row should be Alpha (ascending)
    const firstDataRow = rows[1];
    expect(firstDataRow).toBeDefined();
    expect(within(firstDataRow!).getByText('Alpha Campaign')).toBeInTheDocument();
  });

  it('renders empty state when no campaigns are provided', () => {
    render(<CampaignTable campaigns={[]} />);
    expect(screen.getByText('No campaigns found')).toBeInTheDocument();
  });
});
