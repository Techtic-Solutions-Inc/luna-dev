import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getDisplayName, getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

export default function Header() {
  const { user, logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const displayName = user ? getDisplayName(user) : 'Account';

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-sofia-color-16 px-padding-16 tablet:px-padding-24">
      <Link
        to="/"
        className="font-garamond text-heading-md-14 text-primary hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        Sofia Admin
      </Link>
      <div className="flex items-center gap-gap-12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-gap-8 px-padding-8"
              aria-label="Open account menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-10000 bg-primary text-xs font-bold text-primary-foreground">
                {getInitials(displayName)}
              </span>
              <span className="hidden text-sm tablet:inline">{displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Signed in</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} className="mr-2 h-3.5 w-3.5" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setConfirmOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Sign out?"
        description="You will need to authenticate again to access the admin workspace."
        confirmLabel="Sign out"
        destructive
        onConfirm={logout}
      />
    </header>
  );
}
