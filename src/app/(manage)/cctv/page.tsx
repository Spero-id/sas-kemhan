"use client";

import TableCCTV from "@/module/cctv/TableCCTV";
import Link from "next/link";

export default function CCTV() {
  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold">CCTV</h5>
          <Link href={"/cctv/create"} className="btn">
            Create
          </Link>
        </div>

        <TableCCTV />
      </div>
    </div>
  );
}
