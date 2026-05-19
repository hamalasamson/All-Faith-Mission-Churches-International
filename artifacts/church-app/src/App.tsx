import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { SplashScreen } from "@/components/SplashScreen";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Livestream from "@/pages/Livestream";
import Recruitment from "@/pages/Recruitment";
import Giving from "@/pages/Giving";
import More from "@/pages/More";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const SHELL_ROUTES = ["/", "/services", "/livestream", "/recruitment", "/giving", "/more"];

function AppRoutes() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("splashShown"));

  function handleSplashComplete() {
    sessionStorage.setItem("splashShown", "1");
    setShowSplash(false);
  }

  if (showSplash) return <SplashScreen onComplete={handleSplashComplete} />;

  return (
    <Switch>
      {SHELL_ROUTES.map((path) => (
        <Route key={path} path={path}>
          {path === "/" && <AppShell><Home /></AppShell>}
          {path === "/services" && <AppShell><Services /></AppShell>}
          {path === "/livestream" && <AppShell><Livestream /></AppShell>}
          {path === "/recruitment" && <AppShell><Recruitment /></AppShell>}
          {path === "/giving" && <AppShell><Giving /></AppShell>}
          {path === "/more" && <AppShell><More /></AppShell>}
        </Route>
      ))}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AppRoutes />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
