'use client';

import { useEffect, useRef } from 'react';
import { supabase } from '@/shared/lib/supabase-client';

/**
 * Escucha INSERTs en la tabla expenses vía Supabase Realtime.
 * Cuando llega un nuevo gasto, ejecuta el callback `onNewExpense`.
 */
export function useRealtimeExpenses(onNewExpense: () => void) {
  const callbackRef = useRef(onNewExpense);
  callbackRef.current = onNewExpense;

  useEffect(() => {
    const channel = supabase
      .channel('expenses-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'expenses' },
        () => {
          callbackRef.current();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
