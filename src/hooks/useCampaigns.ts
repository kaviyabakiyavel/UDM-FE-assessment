import { useState, useEffect } from "react";
import { fetchCampaigns } from "../services/campaignService";
import type { Campaign } from "../schemas/campaign";

export function useCampaigns() {
  const [data, setData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const data = await fetchCampaigns();
        setData(data.campaigns);
      } catch (err) {
        setError("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  return { data, loading, error };
}