"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useAtom } from "jotai";
import GridLayout from "react-grid-layout";
import { useDetailLayout, useLayoutByUser } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";
import StreamCard from "@/components/StreamCard";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv(1000);

  const searchParams = useSearchParams();
  const region = searchParams?.get("region");
  const { data: dataUserLayout, isLoading: isLoadingUserLayout } = useLayoutByUser(region != null ? parseInt(region) : 1);

  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout({
    id: dataUserLayout?.data?.layout?.find((layout: any) => layout.name === "cctv")?.id || "3",
    refetchInterval: 1000
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
      <Navigation urlManage="/manage/dashboard" permissionManage="cctv.view" />
      {isLoading || isLoadingLayout ? (
        <LoadingGetData />
      ) : (
        <GridLayout
          className="layout pointer-events-none"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1835}
          isDraggable={false}
          isResizable={false}
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
                active={item?.data?.status}
                path_slug={item?.data?.path_slug}
                name={item?.data?.name}
                redirect={`/cctv/${item?.data?.id}`}
                type={1}
                star={item?.data?.star}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
