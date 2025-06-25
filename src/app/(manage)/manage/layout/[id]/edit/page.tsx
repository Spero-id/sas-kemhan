"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import mergeWithSavedLayout from "@/lib/Layout";
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { UpdateLayoutFunction } from "@/services/api/layout/update/UpdateLayoutFunction";
import { hasPermission } from "@/utils/permissions";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { toast } from "react-toastify";

export default function EditLayout({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data: dataSession, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(dataSession?.user, "layout.update")
    ) {
      router.push("/");
    }
  }, [status, dataSession, router]);

  const { data, isLoading, refetch } = useDetailLayout({
    id: id,
  });

  const updateLayout = useMutation({
    mutationFn: UpdateLayoutFunction,
  });

  const [layout, setLayout] = useState<Layout[]>();

  useEffect(() => {
    if (!isLoading && data) {
      const rawLayout = data?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout)
        ? (rawLayout as Layout[])
        : [];

      setLayout(mergeWithSavedLayout(layoutArray, data?.data?.data));
    }
  }, [isLoading, data]);

  const onClick = () => {
    updateLayout.mutate(
      {
        id,
        data: { layout: layout },
      },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
        },
        onError(error: any) {
          const message =
            error?.response?.data?.message ?? "Telah terjadi kesalahan!";

          toast.error(message);
        },
      }
    );
  };

  const onClickDefault = () => {
    if (!data?.data?.data) return;

    const defaultLayout: Layout[] = data.data.data
    .filter((item) => typeof item.path_slug === "string") // pastikan bukan undefined
    .map((item, index) => ({
      i: item.path_slug as string, // safe cast
      x: (index * 3) % 12,
      y: Math.floor((index * 3) / 12) * 2,
      w: 3,
      h: 2,
    }));

    updateLayout.mutate(
      {
        id,
        data: { layout: defaultLayout },
      },
      {
        onSuccess() {
          toast.success("Berhasil diset default!");
          refetch();
        },
        onError(error: any) {
          const message =
            error?.response?.data?.message ?? "Telah terjadi kesalahan!";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit Layout"
        linkPrevious={[
          { href: "/manage/layout", name: "Layout / " },
          { href: "/manage/layout/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600 mb-2">Edit Layout</h5>
          <div className="flex gap-3">
            <button
              className="btn"
              onClick={onClickDefault}
              disabled={updateLayout.isLoading}
            >
              Set Default
            </button>
            <button
              className="btn"
              onClick={onClick}
              disabled={updateLayout.isLoading}
            >
              Simpan Layout
            </button>
          </div>
        </div>

        {(() => {
          if (isLoading) {
            return <LoadingGetData />;
          }

          if (layout?.length) {
            return (
              <GridLayout
                className="layout border border-dashed mt-3"
                layout={layout}
                cols={12}
                rowHeight={30}
                width={1480}
                onLayoutChange={setLayout}
              >
                {layout.map((l) => {
                  const item = data?.data?.data?.find(
                    (d) => d.path_slug === l.i
                  );
                  return item ? (
                    <div key={l.i} className="bg-gray-200 border p-2 rounded">
                      {item.name}
                    </div>
                  ) : null;
                })}
              </GridLayout>
            );
          }

          return <p>No layout data available.</p>;
        })()}
      </div>
    </div>
  );
}
