"use client";
import { useEffect, useState } from "react";

export default function usePlans() {
  const [plans, setPlans] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    setLoading(true);
    const res = await fetch("/api/planner");
    if (res.ok) {
      setPlans(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loading, refresh: fetchPlans };
}
