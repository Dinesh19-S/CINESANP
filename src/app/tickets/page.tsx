'use client';

import { Suspense } from 'react';
import TicketDisplay from '@/components/ticket-display';

export default function TicketsPage() {
  return (
    <Suspense fallback={<div>Loading tickets...</div>}>
      <TicketDisplay />
    </Suspense>
  );
}
