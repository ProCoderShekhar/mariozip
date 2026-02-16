
export interface AffiliateStatsParams {
  userId: string;
  startDate?: string;
  endDate?: string;
  gameIdentifiers?: string;
  categories?: string;
  providers?: string;
  sortBy?: 'wagered' | 'highestMultiplier';
}

export interface HighestMultiplier {
  multiplier: number;
  wagered: number;
  payout: number;
  gameId: string;
  gameTitle: string;
}

export interface AffiliateStats {
  uid: string;
  username: string;
  wagered: number;
  favoriteGameId: string;
  favoriteGameTitle: string;
  weightedWagered: number;
  rankLevel: number;
  rankLevelImage: string;
  highestMultiplier: HighestMultiplier;
}

// Map the API response to the LeaderboardEntry interface expected by the UI if possible, 
// or update the UI to use AffiliateStats. 
// For now, I'll export the new types and the fetch function.
// I will also keep a compatible 'fetchLeaderboard' for backward compatibility if needed, 
// but mapped to the real API.

const API_URL = '/api/connect/affiliate/v2/stats';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjN2Y2NjcyLWZkOTItNDc5Yi05MDMzLTk3MzlkOTEzZDM3NCIsIm5vbmNlIjoiMGIxNmYxM2ItYzY1Ny00Mzg2LTg5MWMtZTBiZTMwM2U5OTVjIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzUwODAzNzU0fQ.MM85GRm9fPJ2s_q1e37aWH-BIOhVCuW01nOgFW6-g4E';
const USER_ID = '2c7f6672-fd92-479b-9033-9739d913d374';

export const fetchAffiliateStats = async (params: AffiliateStatsParams = { userId: USER_ID }): Promise<AffiliateStats[]> => {
  const queryAsync = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryAsync.append(key, value);
    }
  });

  try {
    const response = await fetch(`${API_URL}?${queryAsync.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, text);
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch affiliate stats:", error);
    return [];
  }
};

// Adapter for existing UI if it expects fetchLeaderboard
export interface LeaderboardEntry {
  username: string;
  wagered: number;
  rank?: number;
  // Add other fields as needed
  favoriteGameTitle?: string;
  highestMultiplier?: number;
}


function maskUsername(username: string): string {
  if (!username) return 'Anonymous';
  return username.charAt(0) + '*'.repeat(username.length - 1);
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const stats = await fetchAffiliateStats({ userId: USER_ID, sortBy: 'wagered' });
  return stats.map((stat, index) => ({
    username: maskUsername(stat.username),
    wagered: stat.weightedWagered, // Use weighted wager for leaderboard
    rank: index + 1,
    favoriteGameTitle: stat.favoriteGameTitle,
    highestMultiplier: stat.highestMultiplier?.multiplier
  }));
}
