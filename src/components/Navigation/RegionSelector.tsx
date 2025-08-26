"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useAllRegion } from "@/services/api/region/get/get.hooks";
import { Region } from "@/types/Region/TypeRegion";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
import { IoChevronDown } from "react-icons/io5";

export default function RegionSelector() {
    const { data, status } = useSession();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { data: regionsData, isLoading } = useAllRegion();
    const currentRegion = searchParams?.get("region") ?? "1";

    const handleRegionChange = (regionId: string) => {
        const params = new URLSearchParams(searchParams?.toString());

        if (regionId === "1") {
            params.delete("region");
        } else {
            params.set("region", regionId);
        }

        const newUrl = `${pathname}?${params.toString()}`;
        window.location.href = newUrl;
    };

    if (status !== "authenticated" || !hasPermission(data?.user, "region.view")) {
        return null;
    }

    return (
        <div className="flex items-center">
            <div className="relative">
                <select
                    className="input input-bordered flex items-center gap-2 bg-deep-teal bg-opacity-50 rounded text-white pr-10 appearance-none cursor-pointer"
                    value={currentRegion || "all"}
                    onChange={(e) => handleRegionChange(e.target.value)}
                    disabled={isLoading}
                >
                    {regionsData?.data?.map((region: Region) => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </select>
                <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
            </div>
        </div>
    );
}
