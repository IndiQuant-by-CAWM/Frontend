import { useState, useCallback } from 'react';

export function useLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = useCallback(async (period = '7d') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/leaderboard?period=${period}&top_n=100`);
      const data = await response.json();
      setLeaderboardData(data.leaderboard || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { leaderboardData, isLoading, fetchLeaderboard };
}
