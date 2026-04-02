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

    // The API might return an array directly (mock data) or an object with an 'affiliates' array (production API)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let affiliatesArray: any[] = [];
    if (Array.isArray(data)) {
      affiliatesArray = data;
    } else if (data && data.affiliates && Array.isArray(data.affiliates)) {
      affiliatesArray = data.affiliates;
    } else {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stats = affiliatesArray.map((affiliate: any) => {
      // Handle both 'wagered_amount' (prod) and 'wagered' (mock)
      const rawWagered = affiliate.wagered_amount !== undefined ? affiliate.wagered_amount : affiliate.wagered;
      return {
        username: affiliate.username,
        wagered: typeof rawWagered === 'string'
          ? parseFloat(rawWagered)
          : (rawWagered || 0),
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
