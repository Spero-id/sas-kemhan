import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function SidebarFooter() {
  const { data } = useSession();

  return (
    <div className="flex flex-center justify-between shrink-0 ps-4 pe-3.5 h-14">
      <UserDropdownMenu
        trigger={
          <button className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="Awatar"
                src={data?.user?.image?.trim() ? data.user.image : "/images/profile.png"}
                width={40}
                height={40}
              />
            </div>
          </button>
        }
      />

      <div className="flex flex-center gap-1.5">
        {/* <NotificationsSheet
          trigger={
            <Button
              variant="ghost"
              mode="icon"
              className="hover:bg-background hover:[&_svg]:text-primary"
            >
              <MessageSquareDot className="size-4.5!" />
            </Button>
          }
        />
       */}
      </div>
    </div>
  );
}
