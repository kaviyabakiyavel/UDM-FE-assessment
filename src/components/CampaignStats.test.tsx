import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CampaignStats } from './CampaignStats';
import type { Campaign } from '../schemas/campaign';

// ---------------------------------------------------------------------------
// Task 2 — Tests (do not modify)
// ---------------------------------------------------------------------------

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

describe('CampaignStats', () => {
  it('renders the total number of campaigns', () => {
    render(<CampaignStats campaigns={mockCampaigns} />);
    expect(screen.getByText('Total Campaigns')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders the total spend formatted as currency', () => {
    render(<CampaignStats campaigns={mockCampaigns} />);
    expect(screen.getByText('Total Spend')).toBeInTheDocument();
    expect(screen.getByText('$23,000.00')).toBeInTheDocument();
  });

  it('renders the average CTR as a percentage', () => {
    render(<CampaignStats campaigns={mockCampaigns} />);
    expect(screen.getByText('Average CTR')).toBeInTheDocument();
    // Campaign A: 3000/100000 = 3%, Campaign B: 7000/200000 = 3.5%, Average = 3.25%
    expect(screen.getByText('3.25%')).toBeInTheDocument();
  });

  it('renders the total conversions', () => {
    render(<CampaignStats campaigns={mockCampaigns} />);
    expect(screen.getByText('Conversions')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('handles empty campaigns array', () => {
    render(<CampaignStats campaigns={[]} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0.00%')).toBeInTheDocument();
  });
});
