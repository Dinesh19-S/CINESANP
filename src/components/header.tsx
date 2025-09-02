'use client';

import Link from 'next/link';
import { Clapperboard, Film, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Movies', icon: Film },
  { href: '/recommendations', label: 'For You', icon: TicketIcon },
  { href: '/tickets', label: 'My Tickets', icon: TicketIcon },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Clapperboard className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl font-headline">CineSnap</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-primary flex items-center gap-2',
                pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
           <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
