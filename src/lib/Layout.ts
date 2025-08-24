import { LayoutEdit } from "@/types/Layout/TypeLayout";
import { Layout } from "react-grid-layout";

const mergeWithSavedLayout = (
  savedLayout: Layout[],
  data: any[]
): Layout[] => {
  const layoutMap = new Map(savedLayout?.map((l) => [l.i, l]) ?? []);

  const items: Layout[] = [];

  let maxY = 0;
  layoutMap.forEach((l) => {
    items.push(l);
    const bottomY = l.y + l.h;
    if (bottomY > maxY) maxY = bottomY;
  });

  data.forEach((row, index) => {
    if (row.path_slug && !layoutMap.has(row.path_slug)) {
      items.push({
        i: row.path_slug,
        x: (index * 3) % 12,
        y: maxY,
        w: 3,
        h: 2,
      });
    }
  });

  return items;
};

export default mergeWithSavedLayout;