import { z } from 'zod';

// ---------------------------------------------------------------------------
// Task 1 — Define Zod schemas, derive TypeScript types, and validate data
// ---------------------------------------------------------------------------
//
// 1. CampaignSchema — validates a single campaign object:
//      id          string
//      name        string, minimum 1 character
//      status      one of 'active' | 'paused' | 'completed'
//      platform    one of 'google' | 'facebook' | 'instagram' | 'tiktok'
//      budget      number, non-negative
//      spent       number, non-negative
//      impressions number, non-negative integer
//      clicks      number, non-negative integer
//      conversions number, non-negative integer
//      startDate   string
//      endDate     string
//
// 2. CampaignsResponseSchema — validates paginated API response:
//      campaigns   array of CampaignSchema
//      total       number
//      page        number
//      pageSize    number
//
// 3. Export derived TypeScript types:
//      Campaign          (from CampaignSchema)
//      CampaignsResponse (from CampaignsResponseSchema)
//
// 4. parseCampaigns(data: unknown): CampaignsResponse
//      Validates unknown data against CampaignsResponseSchema.
//      Returns parsed result on success. Throws on invalid input.
// ---------------------------------------------------------------------------

export const CampaignSchema = z.object({
  // TODO: define fields
  id: z.string(),
  name: z.string().min(1),
  status: z.enum(["active", "paused", "completed"]),
  platform: z.enum(['google', 'facebook', 'instagram', 'tiktok']),
  budget: z.number().nonnegative(),
  spent: z.number().nonnegative(),
  impressions: z.number().nonnegative(),
  clicks: z.number().nonnegative(),
  conversions: z.number().nonnegative(),
  startDate: z.string(),
  endDate: z.string()
});

export const CampaignsResponseSchema = z.object({
  // TODO: define fields
  campaigns: z.array(CampaignSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number()
});

export type Campaign = z.infer<typeof CampaignSchema>;
export type CampaignsResponse = z.infer<typeof CampaignsResponseSchema>;

export function parseCampaigns(data: unknown): CampaignsResponse {
  // TODO: validate data against CampaignsResponseSchema and return the result
  return CampaignsResponseSchema.parse(data)
}
