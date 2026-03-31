// This page integrates your completed components.
// Uncomment and wire up as you complete each task.

import { useState, useEffect } from 'react';
import { fetchCampaigns } from '../services/campaignService';
// import { CampaignStats } from '../components/CampaignStats';
import { CampaignTable } from '../components/CampaignTable';
// import { CampaignChart } from '../components/CampaignChart';
import type { Campaign } from '../schemas/campaign';

export function Dashboard() {
  const [campaignData, setData] = useState<Campaign[]>([])

  useEffect(() => {
    const CampaignsData = async () => {
      const data = await fetchCampaigns()
      setData(data.campaigns)
    }
    CampaignsData()
  }, [])

  console.log("campaignData", campaignData)
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Campaign Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Complete the assessment tasks to build this dashboard. Run{' '}
        <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm dark:bg-gray-700">
          npm run test:watch
        </code>{' '}
        and see <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm dark:bg-gray-700">README.md</code> for
        instructions.
      </p>
      <CampaignTable campaigns={campaignData}/>
    </div>
  );
}
