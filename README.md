# FE Assessment 2026 — Campaign Analytics Dashboard

## Overview

Build a campaign analytics dashboard using React, TypeScript, and modern tooling. This assessment evaluates your ability to write clean, tested, production-quality front-end code.

**Time limit: 45–60 minutes**

## Getting Started

```bash
npm install
npm run dev          # Start development server
npm test             # Run tests (they will fail initially)
npm run test:watch   # Run tests in watch mode
npm run typecheck    # Check TypeScript types
npm run lint         # Run ESLint
```

## Tech Stack

| Tool                             | Purpose                             |
| -------------------------------- | ----------------------------------- |
| React 19                         | UI framework                        |
| TypeScript 5.8 (strict)          | Type safety — `any` is a lint error |
| Vite 6                           | Build tooling                       |
| Vitest 3 + React Testing Library | Testing                             |
| Tailwind CSS 4                   | Utility-first styling               |
| Zod 3                            | Runtime schema validation           |
| ApexCharts                       | Data visualization                  |
| React Router 7                   | Client-side routing                 |
| MSW 2                            | API mocking in tests                |

## How This Assessment Works

Each task has **pre-written failing tests**. Your workflow is:

1. Run `npm run test:watch`
2. Read the failing tests to understand what's expected
3. Implement the minimum code to make each test pass
4. Refactor if needed, keeping tests green

**Do not modify test files.**

---

## Tasks

### Task 1: Schema Validation (~10 min)

**File:** `src/schemas/campaign.ts`
**Tests:** `src/schemas/campaign.test.ts`

Define Zod schemas for campaign data and implement runtime validation:

1. Create `CampaignSchema` with field types and constraints (see TODO comments in file)
2. Create `CampaignsResponseSchema` for the paginated API response
3. Export TypeScript types derived from schemas: `Campaign`, `CampaignsResponse`
4. Implement `parseCampaigns()` — validates unknown data, throws on invalid input

**What we're evaluating:** Zod proficiency, schema-first thinking, type derivation from schemas.

---

### Task 2: Stats Cards Component (~15 min)

**File:** `src/components/CampaignStats.tsx`
**Tests:** `src/components/CampaignStats.test.tsx`

Build a responsive stats component displaying:

| Card            | Value                                                     |
| --------------- | --------------------------------------------------------- |
| Total Campaigns | Count of campaigns                                        |
| Total Spend     | Sum of `spent`, formatted as `$23,000.00`                 |
| Average CTR     | Per-campaign `clicks / impressions`, averaged, as `3.25%` |
| Conversions     | Sum of `conversions`                                      |

**Requirements:**

- Responsive grid: 1 col → 2 cols → 4 cols
- Dark mode support via Tailwind `dark:` variants
- Handle empty arrays gracefully (`0`, `$0.00`, `0.00%`)

**What we're evaluating:** React component design, Tailwind CSS, responsive layout, data formatting.

---

### Task 3: API Service & Data Table (~15 min)

**Files:** `src/services/campaignService.ts` + `src/components/CampaignTable.tsx`
**Tests:** `src/services/campaignService.test.ts` + `src/components/CampaignTable.test.tsx`

**3a — Service Layer** (`campaignService.ts`):

- Fetch from `/api/campaigns` using the Fetch API
- Validate response with your `parseCampaigns` function
- Handle network and validation errors (throw on failure)

**3b — Data Table** (`CampaignTable.tsx`):

| Column   | Format                            |
| -------- | --------------------------------- |
| Name     | Plain text                        |
| Status   | `active` / `paused` / `completed` |
| Platform | Plain text                        |
| Budget   | Currency (`$10,000.00`)           |
| Spent    | Currency (`$5,000.00`)            |
| CTR      | Percentage (`3.00%`)              |

- Click column header to sort ascending
- Show `"No campaigns found"` when empty

**What we're evaluating:** API integration, runtime validation, table implementation, sorting logic.

---

### Task 4: Chart Component (~10 min)

**File:** `src/components/CampaignChart.tsx`
**Tests:** `src/components/CampaignChart.test.tsx`

Create a bar chart of campaign spend using ApexCharts:

- Heading: `"Campaign Spend Overview"`
- Chart type: `bar`
- X-axis: campaign names
- Y-axis: spend amounts
- Use `react-apexcharts` default export

**What we're evaluating:** Charting library integration, data transformation, component structure.

---

## Rules

1. **Make the tests pass.** Do not modify test files.
2. **TypeScript strict mode** — no `any`, no `@ts-ignore`, no non-null assertions.
3. **Use Tailwind CSS** for all styling.
4. **Commit your work** with clear, conventional commit messages.
5. **Small, incremental commits** — each commit should leave the codebase in a working state.

## Evaluation Criteria

- All tests pass
- TypeScript compiles with zero errors
- Clean, readable code with functional programming patterns
- Proper Zod schema validation at trust boundaries
- Responsive, accessible UI with dark mode support
- Meaningful git history
