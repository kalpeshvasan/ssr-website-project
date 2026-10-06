"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchGraphQL } from "./client";

export function useGraphQLQuery<T = unknown>(query: string, variables?: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  const execute = useCallback(async (overrideVars?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    const result = await fetchGraphQL<T>(query, overrideVars || variables);
    if (result.errors && result.errors.length > 0) {
      setError(result.errors.map((e) => e.message).join(", "));
    } else if (result.data) {
      setData(result.data);
    }
    setExecutionTime(result.durationMs);
    setLoading(false);
  }, [query, variables]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void execute();
    }, 0);

    return () => clearTimeout(timeout);
  }, [execute]);

  return { data, loading, error, executionTime, refetch: execute };
}

export function useGraphQLMutation<T = unknown>(mutation: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number>(0);

  const executeMutation = async (variables?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    const result = await fetchGraphQL<T>(mutation, variables);
    setExecutionTime(result.durationMs);
    setLoading(false);

    if (result.errors && result.errors.length > 0) {
      const errMsg = result.errors.map((e) => e.message).join(", ");
      setError(errMsg);
      throw new Error(errMsg);
    }
    return result.data;
  };

  return { executeMutation, loading, error, executionTime };
}
