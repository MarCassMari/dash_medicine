import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

const LoginPage = () =>{
return (

  <div className="flex h-screen w-screen items-center justify-center">


<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>


{/*Tab Login*/}
  <TabsContent value="login">
    <Card>
      <CardHeader>
<CardTitle>Login </CardTitle>
        </CardHeader>
<CardContent>
  <form>
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="youremail@example.com"
          required
          />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
    </div>
  </form>
</CardContent>
<CardFooter className="flex-col gap-2">
  <Button type="submit" className="w-full">
    Login
  </Button>
  <Button variant="outline" className="w-full">
    Login with Google
  </Button>
</CardFooter>
</Card>


</TabsContent>

{/*Tab Register*/}

  <TabsContent value="register">
  <Card>
      <CardHeader>
<CardTitle>Register </CardTitle>
        </CardHeader>
  <CardContent>
  <form>
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="youremail@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
    </div>
  </form>
</CardContent>
<CardFooter className="flex-col gap-2">
  <Button type="submit" className="w-full">
    Register
  </Button>
  <Button variant="outline" className="w-full">
    Register with Google
  </Button>
</CardFooter>
</Card>
</TabsContent>

    
</Tabs>



</div>);
};

export default LoginPage;