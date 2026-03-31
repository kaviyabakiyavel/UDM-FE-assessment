import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchCampaigns } from './campaignService';

// ---------------------------------------------------------------------------
// Task 3a — Tests (do not modify)
// ---------------------------------------------------------------------------

const validResponse = {
  campaigns: [
    {
      id: 'camp-001',
      name: 'Test Campaign',
      status: 'active' as const,
      platform: 'google' as const,
      budget: 10000,
      spent: 5000,
      impressions: 100000,
      clicks: 5000,
      conversions: 250,
      startDate: '2026-03-01',
      endDate: '2026-03-31',
    },
  ],
  total: 1,
  page: 1,
  pageSize: 10,
};

const server = setupServer(
  http.get('/api/campaigns', () => {
    return HttpResponse.json(validResponse);
  }),
);

beforeAll(() => { server.listen(); });
afterEach(() => { server.resetHandlers(); });
afterAll(() => { server.close(); });

describe('fetchCampaigns', () => {
  it('fetches and validates campaign data', async () => {
    const result = await fetchCampaigns();
    expect(result.campaigns).toHaveLength(1);
    expect(result.campaigns[0]?.name).toBe('Test Campaign');
    expect(result.total).toBe(1);
  });

  it('throws on invalid API response shape', async () => {
    server.use(
      http.get('/api/campaigns', () => {
        return HttpResponse.json({ unexpected: true });
      }),
    );

    await expect(fetchCampaigns()).rejects.toThrow();
  });

  it('throws on network error', async () => {
    server.use(
      http.get('/api/campaigns', () => {
        return HttpResponse.error();
      }),
    );

    await expect(fetchCampaigns()).rejects.toThrow();
  });
});
