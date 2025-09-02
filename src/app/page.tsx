'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Ticket, ChevronRight, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import MovieCard from '@/components/movie-card';
import { allMovies, allGenres } from '@/lib/data';
import type { Movie } from '@/types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || movie.genres.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <div className="space-y-16">
      <section className="relative text-center py-20 md:py-32 overflow-hidden rounded-xl">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/1200/800"
            alt="Cinema background"
            data-ai-hint="cinema hall"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 animate-fade-in-up">
            Your Next Favorite Movie Awaits.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover films you'll love with personalized recommendations, browse current listings, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/recommendations">
                <Ticket className="mr-2" />
                Get Recommendations
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#now-showing">
                <Film className="mr-2"/>
                Browse Movies
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="now-showing" className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="font-headline text-3xl font-bold tracking-tight">Now Showing</h2>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} style={{ animationDelay: `${index * 0.05}s` }} className="animate-fade-in-up" />
            ))}
          </div>
        ) : (
          <Card className="col-span-full text-center py-20">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
