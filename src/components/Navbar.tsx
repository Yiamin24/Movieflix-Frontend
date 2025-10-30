import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface NavbarProps {
  user: { email: string; name: string } | null;
  onLogout: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          
          <h1 className="text-primary font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-none">
            MOVIEFLIX
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="gap-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
