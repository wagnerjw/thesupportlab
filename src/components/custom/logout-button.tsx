'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/src/components/ui/button';
import { signOut } from '@/src/db/auth';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  );
}
