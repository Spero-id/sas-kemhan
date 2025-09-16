"use client";
import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { createColumnHelper, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useAtom } from "jotai";
import {
    isConfirmDeleteAtom,
    paramsDeleteAtom,
} from "@/common/module/SettingsJotai";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { useDeleteCctv } from "@/services/api/cctv/delete/delete.hooks";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { useAllDevice } from "@/services/api/device/get/get.hooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Device as DeviceType } from "@/types/Device/TypeDevice";



function ActionsCell({ row }: { row: any }) {
    const { status, data } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button className="size-7" mode="icon" variant="ghost">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                {(() => {
                    let permissionKey = "";
                    if (row.original.type === "cctv") permissionKey = "cctv.update";
                    else if (row.original.type === "body_worm") permissionKey = "body_worm.update";
                    else if (row.original.type === "helmet") permissionKey = "helmet.update";
                    const hasPerm = hasPermission(data?.user, permissionKey);
                    return (
                        <DropdownMenuItem
                            onClick={() => {
                                if (hasPerm) {
                                    window.location.href = `/manage/${row.original.type}/${row.original.id}/edit`;
                                }
                            }}
                            disabled={!hasPerm}
                        >
                            Edit
                        </DropdownMenuItem>
                    );
                })()}


               
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default function TableDevice({ data, isLoading, refetch }: any) {
    const columnHelper = createColumnHelper<DeviceType>();

    const columns = [

        columnHelper.accessor((row) => row.name, {
            id: "name",
            enableSorting: true,
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <DataGridColumnHeader title="Name" column={column} />
            ),

        }),

        columnHelper.accessor((row) => row.regions?.name, {
            id: "region",
            enableSorting: true,
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <DataGridColumnHeader title="Region" column={column} />
            ),

        }),



        columnHelper.accessor((row) => row.status, {
            id: "status",
            enableSorting: true,
            cell: (status) => {


                if (status.getValue()) {
                    return (
                        <Badge
                            size="lg"
                            variant={"success"}
                            appearance="outline"
                            shape="circle"
                        >
                            <BadgeDot className={`success`} />
                            Active
                        </Badge>
                    )
                } else {
                    return (
                        <Badge
                            size="lg"
                            variant={"destructive"}
                            appearance="outline"
                            shape="circle"
                        >
                            <BadgeDot className={`destructive`} />
                            InActive
                        </Badge>
                    )
                }
            }
        }),


        columnHelper.accessor((row) => row.name, {
            id: "actions",
            header: '',
            cell: ({ row }) => <ActionsCell row={row} />,
            enableSorting: false,
            size: 1,
            meta: {
                headerClassName: '',
            },

        }),




    ];

    const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
    const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
    const deleteHooks = useDeleteCctv(paramsDelete);

    const handleDelete = (id: string) => {
        setIsConfirmDelete(true);
        setParamsDelete({
            id: id,
        });
    };

    return (
        <>
            {isLoading ? (
                <LoadingTableCustom />
            ) : (
                <TableCustom data={data?.data || []} columns={columns}></TableCustom>
            )}

            {isConfirmDelete && (
                <ConfirmDeleteModal hooks={deleteHooks} refetch={refetch} />
            )}
        </>
    );
}


