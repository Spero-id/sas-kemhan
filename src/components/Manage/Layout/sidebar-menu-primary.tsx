'use client';

import { JSX, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { hasPermission } from '@/utils/permissions';
import { usePathname } from 'next/navigation';
import { MENU_SIDEBAR_COMPACT } from '@/config/menu.config';
import { MenuConfig, MenuItem } from '@/config/types';
import { cn } from '@/lib/utils';
import {
  AccordionMenu,
  AccordionMenuClassNames,
  AccordionMenuGroup,
  AccordionMenuItem,
  AccordionMenuSub,
  AccordionMenuSubContent,
  AccordionMenuSubTrigger,
} from '@/components/ui/accordion-menu';

export function SidebarMenuPrimary() {
  const pathname = usePathname() || '';
  const { data, status } = useSession();

  // Memoize matchPath to prevent unnecessary re-renders
  const matchPath = useCallback(
    (path: string): boolean =>
      path === pathname || (path.length > 1 && pathname.startsWith(path)),
    [pathname],
  );

  // Global classNames for consistent styling
  const classNames: AccordionMenuClassNames = {
    root: 'space-y-2.5 px-3.5',
    group: 'gap-px',
    label:
      'uppercase text-xs font-medium text-mutedForeground/70 pt-2.25 pb-px',
    separator: '',
    item: 'h-9 hover:bg-transparent border border-transparent text-accent-foreground hover:text-mono data-[selected=true]:text-mono data-[selected=true]:bg-background data-[selected=true]:border-border data-[selected=true]:font-medium',
    sub: '',
    subTrigger:
      'h-9 hover:bg-transparent border border-transparent text-accent-foreground hover:text-mono data-[selected=true]:text-mono data-[selected=true]:bg-background data-[selected=true]:border-border data-[selected=true]:font-medium',
    subContent: 'py-0',
    indicator: '',
  };

  const buildMenu = (items: MenuConfig): JSX.Element[] => {
    return items.map((item: MenuItem, index: number) => {

      if (
        !item.heading &&
        !item.disabled &&
        (!item.permission || hasPermission(data?.user, item.permission))
      ) {
        return buildMenuItemRoot(item, index);
      } else {
        return <></>;
      }
    });
  };

  const buildMenuItemRoot = (item: MenuItem, index: number): JSX.Element => {


    if (!item.sidebar) {
      return (<></>)
    }

    if (item.children) {
      return (
        <AccordionMenuSub key={index} value={item.path || `root-${index}`}>
          <AccordionMenuSubTrigger className="text-sm font-medium">
            {item.icon && <item.icon data-slot="accordion-menu-icon" />}
            <span data-slot="accordion-menu-title">{item.title}</span>
          </AccordionMenuSubTrigger>
          <AccordionMenuSubContent
            type="single"
            collapsible
            parentValue={item.path || `root-${index}`}
            className="ps-6"
          >
            <AccordionMenuGroup>
              {buildMenuItemChildren(item.children, 1)}
            </AccordionMenuGroup>
          </AccordionMenuSubContent>
        </AccordionMenuSub>
      );
    } else {
      return (
        <AccordionMenuItem
          key={index}
          value={item.path || ''}
          className="text-sm font-medium"
          onClick={(e) => {
            window.location.href = item.path || '#';
          }}
        >
          <a>
            {item.icon && <item.icon data-slot="accordion-menu-icon" />}
            <span data-slot="accordion-menu-title">{item.title} </span>
          </a>
        </AccordionMenuItem>
      );
    }
  };

  const buildMenuItemChildren = (
    items: MenuConfig,
    level: number = 0,
  ): JSX.Element[] => {
    return items.map((item: MenuItem, index: number) => {
      // Permission check for child menu item
      if (
        !item.heading &&
        !item.disabled &&
        (!item.permission || hasPermission(data?.user, item.permission))
      ) {
        return buildMenuItemChild(item, index, level);
      } else {
        return <></>;
      }
    });
  };

  const buildMenuItemChild = (
    item: MenuItem,
    index: number,
    level: number = 0,
  ): JSX.Element => {
    if (item.children) {
      return (
        <AccordionMenuSub
          key={index}
          value={item.path || `child-${level}-${index}`}
        >
          <AccordionMenuSubTrigger className="text-[13px]">
            {item.collapse ? (
              <span className="text-mutedForeground">
                <span className="hidden [[data-state=open]>span>&]:inline">
                  {item.collapseTitle}
                </span>
                <span className="inline [[data-state=open]>span>&]:hidden">
                  {item.expandTitle}
                </span>
              </span>
            ) : (
              item.title
            )}
          </AccordionMenuSubTrigger>
          <AccordionMenuSubContent
            type="single"
            collapsible
            parentValue={item.path || `child-${level}-${index}`}
            className={cn(
              'ps-4',
              !item.collapse && 'relative',
              !item.collapse && (level > 0 ? '' : ''),
            )}
          >
            <AccordionMenuGroup>
              {buildMenuItemChildren(
                item.children,
                item.collapse ? level : level + 1,
              )}
            </AccordionMenuGroup>
          </AccordionMenuSubContent>
        </AccordionMenuSub>
      );
    } else {
      return (
        <AccordionMenuItem
          key={index}
          value={item.path || ''}
          className="text-[13px]"
          onClick={(e) => {
            window.location.href = item.path || '#';
          }}
        >
          {item.title}
        </AccordionMenuItem>
      );
    }
  };

  if (status !== 'authenticated') return null;

  return (
    <AccordionMenu
      type="single"
      selectedValue={pathname}
      matchPath={matchPath}
      collapsible
      classNames={classNames}
    >
      {buildMenu(MENU_SIDEBAR_COMPACT)}
    </AccordionMenu>
  );
}
