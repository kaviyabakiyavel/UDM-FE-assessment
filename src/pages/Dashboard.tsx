// This page integrates your completed components.
// Uncomment and wire up as you complete each task.

import { CampaignStats } from '../components/CampaignStats';
import { CampaignTable } from '../components/CampaignTable';
import { CampaignChart } from '../components/CampaignChart';
import { useCampaigns } from '../hooks/useCampaigns';

export function Dashboard() {
  const { data, loading, error } = useCampaigns()

  if(loading) return <p>Loading campaigns...</p>;
  if(error) return <p>{error}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Campaign Dashboard</h1>
      {/* <p className="text-gray-500 dark:text-gray-400">
        Complete the assessment tasks to build this dashboard. Run{' '}
        <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm dark:bg-gray-700">
          npm run test:watch
        </code>{' '}
        and see <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm dark:bg-gray-700">README.md</code> for
        instructions.
      </p> */}
      <CampaignTable campaigns={data} />
      <CampaignStats campaigns={data} />
      <CampaignChart campaigns={data} />
    </div>
  );
}
