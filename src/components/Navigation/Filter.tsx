import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { useAtom } from "jotai";
import { searchDashboardAtom } from "@/common/module/SettingsJotai";

export default function FilterNavigation() {
  const [, setsearchDashboardAtom] = useAtom(searchDashboardAtom);
  return (
    <div className="flex gap-3 justify-end">
      <label className="input input-bordered flex items-center gap-2 bg-deep-teal bg-opacity-50 rounded text-white">
        <input
          type="text"
          className="grow"
          placeholder="Cari"
          onChange={(e) => setsearchDashboardAtom(e.target.value)}
        />
        <CiSearch />
      </label>
      <div className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3">
        <Image src="/icons/filter.svg" alt="filter" width={25} height={25} />
      </div>
    </div>
  );
}
