import { useState, useEffect } from 'react';
import { Stats } from '../api/Stats';

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Stats.getUserStats();
      setStats(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { stats, loading };
};
