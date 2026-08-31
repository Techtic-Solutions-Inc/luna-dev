import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';
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
  const logoutMutation = useLogout();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const displayName = user ? getDisplayName(user) : 'Account';

  return (
    <header className="flex h-[var(--radius-64)] items-center justify-between border-b border-border bg-sofia-color-16 px-padding-16 tablet:px-padding-24">
      <Link
        to="/"
        className="font-garamond text-heading-md-14 text-foreground hover:brightness-110 focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring rounded-sm"
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
              <span className="flex h-padding-32 w-padding-32 items-center justify-center rounded-10000 bg-accent text-caption-7 font-bold text-accent-foreground">
                {getInitials(displayName)}
              </span>
              <span className="hidden max-w-[var(--spacing-gap-125)] truncate text-body-sm-2 tablet:inline">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Signed in</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings/profile">
                <User className="mr-padding-8 h-padding-16 w-padding-16" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setConfirmOpen(true)}
              className="text-destructive-foreground focus:text-destructive-foreground"
            >
              <LogOut className="mr-padding-8 h-padding-16 w-padding-16" />
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
        onConfirm={() => {
          logoutMutation.mutate(undefined, {
            onSettled: () => {
              logout();
            },
          });
        }}
      />
    </header>
  );
}
