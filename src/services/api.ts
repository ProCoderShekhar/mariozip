// Adapter for existing UI if it expects fetchLeaderboard
export interface LeaderboardEntry {
  username: string;
  wagered: number;
  rank?: number;
  favoriteGameTitle?: string;
  highestMultiplier?: number;
}

function maskUsername(username: string): string {
  if (!username) return 'Anonymous';
  return username.charAt(0) + '*'.repeat(username.length - 1);
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch('/api/leaderboard', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, text);
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    let dataArray = [];

    // Check if the response is an array directly (like api_response_sample.json)
    if (Array.isArray(data)) {
      dataArray = data;
    }
    // Check if Roulobets API returns an object with an 'affiliates' array
    else if (data && data.affiliates && Array.isArray(data.affiliates)) {
      dataArray = data.affiliates;
    } else {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stats = dataArray.map((affiliate: any) => {
      let wageredVal = 0;
      if (affiliate.wagered_amount !== undefined) {
        wageredVal = typeof affiliate.wagered_amount === 'string'
          ? parseFloat(affiliate.wagered_amount)
          : affiliate.wagered_amount;
      } else if (affiliate.wagered !== undefined) {
        wageredVal = typeof affiliate.wagered === 'string'
          ? parseFloat(affiliate.wagered)
          : affiliate.wagered;
      }

      return {
        username: affiliate.username,
        wagered: wageredVal,
      };
    });

    // Sort stats by wagered in descending order
    stats.sort((a: { wagered: number }, b: { wagered: number }) => b.wagered - a.wagered);

    return stats.map((stat: { username: string; wagered: number }, index: number) => ({
      username: maskUsername(stat.username),
      wagered: stat.wagered,
      rank: index + 1,
    }));
  } catch (error) {
    console.error("Failed to fetch affiliate stats:", error);
    return [];
  }
}
