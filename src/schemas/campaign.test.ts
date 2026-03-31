import { describe, it, expect } from 'vitest';
import { CampaignSchema, CampaignsResponseSchema, parseCampaigns } from './campaign';

// ---------------------------------------------------------------------------
// Task 1 — Tests (do not modify)
// ---------------------------------------------------------------------------

const validCampaign = {
  id: 'camp-001',
  name: 'Test Campaign',
  status: 'active',
  platform: 'google',
  budget: 10000,
  spent: 5000,
  impressions: 100000,
  clicks: 5000,
  conversions: 250,
  startDate: '2026-03-01',
  endDate: '2026-03-31',
};

describe('CampaignSchema', () => {
  it('validates a valid campaign object', () => {
    const result = CampaignSchema.safeParse(validCampaign);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid status value', () => {
    const result = CampaignSchema.safeParse({ ...validCampaign, status: 'deleted' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid platform value', () => {
    const result = CampaignSchema.safeParse({ ...validCampaign, platform: 'twitter' });
    expect(result.success).toBe(false);
  });

  it('rejects a negative budget', () => {
    const result = CampaignSchema.safeParse({ ...validCampaign, budget: -100 });
    expect(result.success).toBe(false);
  });

  it('rejects a negative impressions value', () => {
    const result = CampaignSchema.safeParse({ ...validCampaign, impressions: -1 });
    expect(result.success).toBe(false);
  });

  it('rejects a missing name', () => {
    const { name: _, ...noName } = validCampaign;
    const result = CampaignSchema.safeParse(noName);
    expect(result.success).toBe(false);
  });

  it('rejects an empty name', () => {
    const result = CampaignSchema.safeParse({ ...validCampaign, name: '' });
    expect(result.success).toBe(false);
  });
});

describe('CampaignsResponseSchema', () => {
  it('validates a valid paginated response', () => {
    const response = {
      campaigns: [validCampaign],
      total: 1,
      page: 1,
      pageSize: 10,
    };

    const result = CampaignsResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });

  it('validates an empty campaigns array', () => {
    const response = {
      campaigns: [],
      total: 0,
      page: 1,
      pageSize: 10,
    };

    const result = CampaignsResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });
});

describe('parseCampaigns', () => {
  it('returns parsed data for valid input', () => {
    const input = {
      campaigns: [validCampaign],
      total: 1,
      page: 1,
      pageSize: 10,
    };

    const result = parseCampaigns(input);
    expect(result.campaigns).toHaveLength(1);
    expect(result.campaigns[0]?.name).toBe('Test Campaign');
    expect(result.total).toBe(1);
  });

  it('throws on invalid input', () => {
    expect(() => parseCampaigns({ invalid: true })).toThrow();
  });

  it('throws when campaigns contain invalid entries', () => {
    const input = {
      campaigns: [{ ...validCampaign, status: 'invalid' }],
      total: 1,
      page: 1,
      pageSize: 10,
    };

    expect(() => parseCampaigns(input)).toThrow();
  });
});
