
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clapperboard } from "lucide-react";

export default function LoginPage() {
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
