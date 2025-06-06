"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAtom } from "jotai";
import GridLayout from "react-grid-layout";
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";
import { useAllBodyWorm } from "@/services/api/body_worm/get/get.hooks";
import { BodyWorm as BodyWormType } from "@/types/BodyWorm/TypeBodyWorm";
import StreamCard from "@/components/StreamCard";

export default function BodyWorm() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllBodyWorm();

  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout({
    id: "3", // layout bodyWorm
  });

  const [layout, setLayout] = useState<any[]>();

  useEffect(() => {
    if (!isLoadingLayout && !isLoading && data?.data) {
      const rawLayout = dataLayout?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout) ? rawLayout : [];

      const mappingLayout = layoutArray
        .filter((item) =>
          data.data.some(
            (bodyWorm: BodyWormType) => bodyWorm.path_slug === item.i
          )
        )
        .map((item) => {
          const matchedBodyWorm = data.data.find(
            (bodyWorm: BodyWormType) => bodyWorm.path_slug === item.i
          );
          item.data = matchedBodyWorm!;
          return item;
        });

      setLayout(mappingLayout);
    }
  }, [isLoadingLayout, isLoading, data, dataLayout]);

  return (
    <>
      <Navigation />
      {isLoading || isLoadingLayout ? (
        <LoadingGetData />
      ) : (
        <GridLayout
          className="layout pointer-events-none"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1850}
          isDraggable
          isResizable
        >
          {layout?.map((item, i: number) => (
            <div
              data-grid={layout[i]}
              className={`h-full w-full ${
                item.data.name
                  .toLowerCase()
                  .includes(searchDashboard.toLowerCase())
                  ? ""
                  : "hidden"
              }`}
              key={i}
            >
              <StreamCard
                path_slug={item?.data?.path_slug}
                name={item?.data?.name}
                redirect={`/body-worm/${item?.data?.user_id}`}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
