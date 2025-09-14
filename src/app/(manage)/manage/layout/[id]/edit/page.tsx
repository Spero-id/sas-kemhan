"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { UpdateLayoutFunction } from "@/services/api/layout/update/UpdateLayoutFunction";
import { hasPermission } from "@/utils/permissions";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { toast } from "react-toastify";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { Container } from "@/components/common/container";

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
  const [availableItems, setAvailableItems] = useState<any[]>([]);

  // Function to handle drag start from source list
  const onDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({
      id: item.path_slug,
      name: item.name,
      type: "source-item"
    }));
  };

  // Function to handle drop in layout
  const onDrop = useCallback((layout: Layout[], layoutItem: Layout, _event: any) => {
    // This will be called when an item is dropped in the layout
    return layout;
  }, []);

  // Function to add item to layout
  const addItemToLayout = (item: any, position?: { x: number, y: number }) => {
    if (!layout) return;

    // Check if item already exists in layout
    const existingItem = layout.find(l => l.i === item.path_slug);
    if (existingItem) {
      toast.warning("Item sudah ada di layout!");
      return;
    }

    const newLayoutItem: Layout = {
      i: item.path_slug,
      x: position?.x ?? (layout.length * 3) % 12,
      y: position?.y ?? Math.floor((layout.length * 3) / 12) * 2,
      w: 3,
      h: 2,
    };

    setLayout([...layout, newLayoutItem]);
    // Remove item from available items
    setAvailableItems(availableItems.filter(availableItem => availableItem.path_slug !== item.path_slug));
  };

  // Function to remove item from layout
  const removeItemFromLayout = (itemId: string) => {
    if (!layout || !data?.data?.data) return;

    // Find the item being removed
    const removedItem = data.data.data.find(item => item.path_slug === itemId);
    if (removedItem) {
      // Add back to available items
      setAvailableItems([...availableItems, removedItem]);
    }

    setLayout(layout.filter(l => l.i !== itemId));
  };

  useEffect(() => {
    if (!isLoading && data) {
      const rawLayout = data?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout)
        ? (rawLayout as Layout[])
        : [];

      const allData = data?.data?.data || [];

      // Hanya ambil item yang benar-benar ada di layout database
      const layoutItems = layoutArray.filter(layoutItem =>
        allData.some(item => item.path_slug === layoutItem.i)
      );

      setLayout(layoutItems);

      // Set available items dengan item yang TIDAK ada di layout
      const itemsNotInLayout = allData.filter(item =>
        !layoutArray.some(layoutItem => layoutItem.i === item.path_slug)
      );
      setAvailableItems(itemsNotInLayout);
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
    <div>
      <Toolbar>
        <ToolbarHeading />

        <ToolbarActions>


        </ToolbarActions>
      </Toolbar>
      <Container>
        <div className="container mx-auto mt-5">

          {(() => {
            if (isLoading) {
              return <LoadingGetData />;
            }

            return (
              <div>

                <div className="space-y-6">
                  {/* Row 1: Available Items */}
                  <div className="border rounded-lg p-4 bg-gray-50 mt-4">
                    <h6 className="text-lg font-semibold text-slate-700 mb-3">
                      Items Tersedia (Drag ke Layout)
                    </h6>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {availableItems.map((item) => {
                        return (
                          <div
                            key={item.path_slug}
                            draggable={true}
                            onDragStart={(e) => onDragStart(e, item)}
                            className="p-3 rounded border text-center cursor-move transition-all bg-blue-100 hover:bg-blue-200 border-blue-300 text-blue-800"
                            title="Drag ke layout di bawah"
                          >
                            <div className="text-sm font-medium truncate">
                              {item.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {availableItems.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        Tidak ada items tersedia
                      </p>
                    )}
                  </div>

                  {/* Row 2: Layout Area */}
                  <div className="border rounded-lg p-4">
                    <h6 className="text-lg font-semibold text-slate-700 mb-3">
                      Layout Area
                    </h6>

                    {layout?.length ? (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const data = e.dataTransfer.getData("text/plain");
                          try {
                            const item = JSON.parse(data);
                            if (item.type === "source-item") {
                              const fullItem = availableItems.find(ai => ai.path_slug === item.id);
                              if (fullItem) {
                                addItemToLayout(fullItem);
                              }
                            }
                          } catch (error) {
                            console.error("Error parsing dropped data:", error);
                          }
                        }}
                      >
                        <GridLayout
                          className="layout border border-dashed bg-white min-h-[400px]"
                          layout={layout}
                          cols={12}
                          rowHeight={30}
                          width={1400}
                          onLayoutChange={setLayout}
                          isDraggable={true}
                          isResizable={true}
                        >
                          {layout.map((l) => {
                            const item = data?.data?.data?.find(
                              (d) => d.path_slug === l.i
                            );
                            // Only render if item exists in database
                            return item ? (
                              <div key={l.i} className="bg-white border-2 border-gray-300 p-2 rounded shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                  <span className="text-sm font-medium text-gray-700 truncate">
                                    {item.name}
                                  </span>
                                  <button
                                    onClick={() => removeItemFromLayout(l.i)}
                                    className="text-red-500 hover:text-red-700 text-xs ml-1"
                                    title="Hapus dari layout"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ) : null;
                          })}
                        </GridLayout>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 min-h-[400px] flex items-center justify-center"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
                        }}
                        onDragLeave={(e) => {
                          e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                          const data = e.dataTransfer.getData("text/plain");
                          try {
                            const item = JSON.parse(data);
                            if (item.type === "source-item") {
                              const fullItem = availableItems.find(ai => ai.path_slug === item.id);
                              if (fullItem) {
                                addItemToLayout(fullItem);
                              }
                            }
                          } catch (error) {
                            console.error("Error parsing dropped data:", error);
                          }
                        }}
                      >
                        <div className="text-gray-500">
                          <p className="text-lg mb-2">Layout kosong</p>
                          <p className="text-sm">Drag items dari atas ke sini untuk membuat layout</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 my-6  justify-end">
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
            );
          })()}
        </div>

      </Container>
    </div>


  );
}
