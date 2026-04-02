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
  const API_URL = '/api/leaderboard';

  try {
    const response = await fetch(API_URL, {
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

    // Roulobets API returns an object with an 'affiliates' array
    if (!data || !data.affiliates || !Array.isArray(data.affiliates)) {
      return [];
    }

    const stats = data.affiliates.map((affiliate: any) => ({
      username: affiliate.username,
      wagered: parseFloat(affiliate.wagered_amount || "0"),
    }));

    // Sort stats by wagered in descending order
    stats.sort((a: any, b: any) => b.wagered - a.wagered);

    return stats.map((stat: any, index: number) => ({
      username: maskUsername(stat.username),
      wagered: stat.wagered,
      rank: index + 1,
    }));
  } catch (error) {
    console.error("Failed to fetch affiliate stats:", error);
    return [];
  }
}
