import type { CampaignsResponse } from '../schemas/campaign';

// ---------------------------------------------------------------------------
// Task 3a — Implement the campaign service
// ---------------------------------------------------------------------------
//
// fetchCampaigns():
//   1. Fetch data from '/api/campaigns' using the Fetch API
//   2. Parse the JSON response
//   3. Validate using parseCampaigns() from your schema (Task 1)
//   4. Return the validated CampaignsResponse
//   5. Throw meaningful errors for network failures and validation errors
//
// Hints:
//   - import { parseCampaigns } from '../schemas/campaign';
//   - Check response.ok before parsing JSON
//   - Let Zod validation errors propagate naturally
// ---------------------------------------------------------------------------

import { parseCampaigns } from '../schemas/campaign';
export async function fetchCampaigns(): Promise<CampaignsResponse> {
  try {
    const res = await fetch("/api/campaigns");
    if(!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }
    const data: unknown = await res.json();
    return parseCampaigns(data)
  } catch(error: unknown) {
    // Mock fallback if API is not available
    // const mockData = {
    //   campaigns: [
    //     {
    //       id: 'camp-001',
    //       name: 'Alpha Campaign',
    //       status: 'active',
    //       platform: 'google',
    //       budget: 10000,
    //       spent: 5000,
    //       impressions: 100000,
    //       clicks: 3000,
    //       conversions: 150,
    //       startDate: '2026-03-01',
    //       endDate: '2026-03-31',
    //     },
    //     {
    //       id: 'camp-002',
    //       name: 'Beta Campaign',
    //       status: 'paused',
    //       platform: 'facebook',
    //       budget: 20000,
    //       spent: 18000,
    //       impressions: 200000,
    //       clicks: 7000,
    //       conversions: 350,
    //       startDate: '2026-01-01',
    //       endDate: '2026-02-28',
    //     },
    //   ],
    //   total: 2,
    //   page: 1,
    //   pageSize: 10,
    // };
    // return parseCampaigns(mockData);
    throw error;
  }
}
