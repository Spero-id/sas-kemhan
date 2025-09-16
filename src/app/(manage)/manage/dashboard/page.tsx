"use client";

import { Container } from "@/components/common/container";
import { IStatisticsItems, Statistics } from "@/components/Statistics";
import TableDevice from "@/module/dashboard/TableDevice";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { useAllDevice } from "@/services/api/device/get/get.hooks";

export default function Dashboard() {

    const { isLoading, data, refetch } = useAllDevice();

    const items: IStatisticsItems = [
        { number: (data?.count?.total ?? 0).toString(), label: 'DEVICE' },
        { number: (data?.count?.cctv ?? 0).toString(), label: 'CCTV' },
        { number: (data?.count?.body_worm ?? 0).toString(), label: 'BODY WORM' },
        { number: (data?.count?.helmet ?? 0).toString(), label: 'HELMET' },
    ];

    return (
        <div>
            <Toolbar>
                <ToolbarHeading />
                <ToolbarActions>
                    <a href={"/"} className="btn">
                        Kembali Home
                    </a>
                </ToolbarActions>
            </Toolbar>
            <Container>
                <div className="mb-4">
                    <Statistics items={items} isLoading={isLoading} />
                </div>
                <TableDevice data={data} refetch={refetch} isLoading={isLoading} />
            </Container>
        </div>
    );
}
