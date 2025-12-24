import { useState, useCallback } from 'react';

export function useTournament() {
  const [tournaments, setTournaments] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTournaments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/tournaments/active');
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async (userId) => {
    try {
      const response = await fetch(`/api/v1/leaderboard/user/${userId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  return { tournaments, stats, isLoading, fetchTournaments, fetchStats };
}
