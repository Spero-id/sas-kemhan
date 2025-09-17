"use client";
import { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ROOT } from '@/config/menu.config';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export function SidebarHeader() {

  const pathname = usePathname();
  const [selectedMenuItem, setSelectedMenuItem] = useState(MENU_ROOT[1]);


  useEffect(() => {
    MENU_ROOT.forEach((item) => {
      if (item.rootPath && pathname?.includes(item.rootPath)) {
        setSelectedMenuItem(item);
      }
    });
  }, [pathname]);

  return (
    <div className="mb-3.5">
      <div className="flex items-center justify-between gap-2.5 px-3.5 h-[70px]">

        {/* <a href="/">
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Seal_of_the_Ministry_of_Defense_of_the_Republic_of_Indonesia_%282022%29.svg/960px-Seal_of_the_Ministry_of_Defense_of_the_Republic_of_Indonesia_%282022%29.svg.png'}
            className=" h-[42px]"
            alt=""
          />
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Seal_of_the_Ministry_of_Defense_of_the_Republic_of_Indonesia_%282022%29.svg/960px-Seal_of_the_Ministry_of_Defense_of_the_Republic_of_Indonesia_%282022%29.svg.png'}
            className="hidden  h-[42px]"
            alt=""
          />
        </a> */}

        <h1 className="cursor-pointer font-bold text-2xl tracking-tight flex items-center justify-between gap-2 w-[180px]">
          Eysee 
        </h1>

      </div>

    </div>
  );

}
