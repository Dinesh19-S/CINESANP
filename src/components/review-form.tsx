"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const reviewSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating." }),
  comment: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }).max(500, {
    message: "Review must not be longer than 500 characters."
  }),
});

export default function ReviewForm() {
  const { toast } = useToast();
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log(values);
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <div 
                  className="flex items-center gap-1"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <Star
                        key={starValue}
                        className={cn(
                          "h-8 w-8 cursor-pointer transition-colors",
                          starValue <= (hoverRating || field.value)
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground/50"
                        )}
                        onClick={() => field.onChange(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                      />
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you think about the movie..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
          Submit Review
        </Button>
      </form>
    </Form>
  );
}
