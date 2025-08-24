"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAtom } from "jotai";
import GridLayout from "react-grid-layout";
import { useDetailLayout, useLayoutByUser } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";
import { useAllHelmet } from "@/services/api/helmet/get/get.hooks";
import { Helmet as HelmetType } from "@/types/Helmet/TypeHelmet";
import StreamCard from "@/components/StreamCard";

export default function Helmet() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllHelmet(1000);
  const { data: dataUserLayout, isLoading: isLoadingUserLayout } = useLayoutByUser();
  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout({
    id: dataUserLayout?.data?.layout?.find((layout: any) => layout.name === "helmet")?.id || "3",
  }, {
    enabled: !isLoadingUserLayout && !!dataUserLayout
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
  }, [isLoadingLayout, isLoading, data, dataLayout]);

  return (
    <>
      <Navigation urlManage="/manage/helmet" permissionManage="helmet.view" />
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
              className={`h-full w-full ${item.data.name
                .toLowerCase()
                .includes(searchDashboard.toLowerCase())
                ? ""
                : "hidden"
                }`}
              key={i}
            >
              <StreamCard
                is_detail={false}
                path_slug={item?.data?.path_slug}
                name={item?.data?.name}
                redirect={`/helmet/${item?.data?.id}`}
                type={2}
                star={item?.data?.star}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
