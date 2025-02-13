import { cookies } from 'next/headers';

import { AppSidebar } from '@/src/components/custom/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/src/components/ui/sidebar';
import { getSession } from '@/src/db/cached-queries';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  const user = await getSession();

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
