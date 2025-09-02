import Link from "next/link";
import { Clapperboard, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">CineSnap</span>
        </div>
        <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
        </div>
        <p className="text-sm text-muted-foreground text-center sm:text-right">
          © {new Date().getFullYear()} CineSnap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
