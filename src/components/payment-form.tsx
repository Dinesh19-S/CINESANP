
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CreditCard, CheckCircle, Ticket, XCircle } from 'lucide-react';
import { Separator } from './ui/separator';

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^[0-9]{16}$/, 'Must be 16 digits'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid MM/YY format'),
  cvv: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVV'),
  name: z.string().min(2, 'Name is required'),
});

const upiSchema = z.object({
  upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID'),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;
type UpiFormValues = z.infer<typeof upiSchema>;

export default function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [seats, setSeats] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState('idle'); // idle, processing, success, failed

  const cardForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
    },
  });

  const upiForm = useForm<UpiFormValues>({
    resolver: zodResolver(upiSchema),
    defaultValues: {
      upiId: '',
    },
  });

  useEffect(() => {
    const seatsParam = searchParams.get('seats');
    const totalParam = searchParams.get('total');

    if (seatsParam) {
      setSeats(seatsParam.split(','));
    }
    if (totalParam) {
      setTotal(parseFloat(totalParam));
    }
  }, [searchParams]);

  const processPayment = async () => {
    setStatus('processing');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate a successful payment
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
        <h1 className="font-headline text-4xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground text-lg mb-8">Your tickets have been booked.</p>
        <Button onClick={() => router.push(`/tickets?seats=${seats.join(',')}&total=${total}`)}>
          <Ticket className="mr-2" />
          View My Tickets
        </Button>
      </div>
    );
  }
  
   if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <XCircle className="h-20 w-20 text-destructive mb-6" />
        <h1 className="font-headline text-4xl font-bold mb-2">Payment Failed</h1>
        <p className="text-muted-foreground text-lg mb-8">Something went wrong. Please try again.</p>
        <Button onClick={() => setStatus('idle')}>
          Try Again
        </Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
       <h1 className="font-headline text-3xl font-bold tracking-tighter mb-2">Complete Your Booking</h1>
       <p className="text-muted-foreground mb-8">Confirm your details and complete the payment.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
           <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
              <TabsTrigger value="upi">UPI</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your card information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...cardForm}>
                    <form onSubmit={cardForm.handleSubmit(processPayment)} className="space-y-4">
                      <FormField
                        control={cardForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Name on Card</Label>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={cardForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Card Number</Label>
                            <FormControl>
                              <Input placeholder="0000 0000 0000 0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-4">
                        <FormField
                          control={cardForm.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem className="w-1/2">
                              <Label>Expiry</Label>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cardForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem className="w-1/2">
                              <Label>CVV</Label>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={status === 'processing'}>
                        {status === 'processing' ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CreditCard className="mr-2" />
                        )}
                        Pay ₹{total.toFixed(2)}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upi">
               <Card>
                <CardHeader>
                  <CardTitle>Pay with UPI</CardTitle>
                  <CardDescription>Scan the QR code or enter your UPI ID</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-center p-4 bg-white rounded-lg">
                      <Image 
                        src="https://picsum.photos/200/200" 
                        alt="UPI QR Code"
                        data-ai-hint="QR code"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                       <Separator className="shrink" />
                       <span className="text-xs text-muted-foreground">OR</span>
                       <Separator className="shrink" />
                    </div>
                   <Form {...upiForm}>
                    <form onSubmit={upiForm.handleSubmit(processPayment)} className="space-y-4">
                      <FormField
                        control={upiForm.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <Label>UPI ID</Label>
                            <FormControl>
                              <Input placeholder="yourname@bank" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={status === 'processing'}>
                        {status === 'processing' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Pay ₹{total.toFixed(2)}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">Selected Seats:</p>
                <div className="flex flex-wrap gap-2 text-sm">
                   {seats.map(seat => <span key={seat} className="bg-primary/10 text-primary font-mono py-1 px-2 rounded-md">{seat}</span>)}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-baseline font-bold text-xl">
                <span>Total:</span>
                <span className="font-headline">₹{total.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
