"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAtom } from "jotai";
import GridLayout from "react-grid-layout";
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";
import { useAllHelmet } from "@/services/api/helmet/get/get.hooks";
import { Helmet as HelmetType } from "@/types/Helmet/TypeHelmet";
import StreamCard from "@/components/StreamCard";

export default function Helmet() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllHelmet();

  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout({
    id: "2", // layout helmet
  });

  const [layout, setLayout] = useState<any[]>();

  useEffect(() => {
    if (!isLoadingLayout && !isLoading && data?.data) {
      const rawLayout = dataLayout?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout) ? rawLayout : [];

      const mappingLayout = layoutArray
        .filter((item) =>
          data.data.some((helmet: HelmetType) => helmet.path_slug === item.i)
        )
        .map((item) => {
          const matchedHelmet = data.data.find(
            (helmet: HelmetType) => helmet.path_slug === item.i
          );
          item.data = matchedHelmet!;
          return item;
        });

      setLayout(mappingLayout);
    }
  }, [isLoadingLayout, isLoading, data]);

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
                redirect={`/helmet/${item?.data?.id}`}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
