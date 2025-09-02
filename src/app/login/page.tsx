'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login, googleLogin } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clapperboard, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Login
    </Button>
  );
}

function GoogleButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="outline" className="w-full" type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login with Google
        </Button>
    )
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);
  const [googleState, googleFormAction] = useFormState(googleLogin, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
     if (googleState?.message) {
      toast({
        title: 'Error',
        description: googleState.message,
        variant: 'destructive',
      });
    }
  }, [state, googleState, toast]);


  return (
    <div className="flex items-center justify-center min-h-screen-minus-header bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <div className="flex justify-center items-center gap-2 mb-4">
            <Clapperboard className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl font-headline">CineSnap</span>
          </div>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <SubmitButton />
          </form>
           <form action={googleFormAction}>
              <GoogleButton />
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
