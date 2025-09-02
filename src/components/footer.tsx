import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">CineSnap</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CineSnap. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
