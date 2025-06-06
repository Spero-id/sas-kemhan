"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useAtom } from "jotai";
import GridLayout from "react-grid-layout";
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";
import StreamCard from "@/components/StreamCard";

export default function Home() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv();

  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout({
    id: "1", // layout cctv
  });

  const [layout, setLayout] = useState<any[]>();

  useEffect(() => {
    if (!isLoadingLayout && !isLoading && data?.data) {
      const rawLayout = dataLayout?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout) ? rawLayout : [];

      const mappingLayout = layoutArray
        .filter((item) =>
          data.data.some((cctv: Cctv) => cctv.path_slug === item.i)
        )
        .map((item) => {
          const matchedCctv = data.data.find(
            (cctv: Cctv) => cctv.path_slug === item.i
          );
          item.data = matchedCctv!;
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
          isDraggable={false}
          isResizable={false}
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
              <StreamCard path_slug={item?.data?.path_slug} name={item?.data?.name} redirect={`/cctv/${item?.data?.id}`} />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
