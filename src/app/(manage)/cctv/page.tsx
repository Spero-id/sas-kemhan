"use client";

import TableCctv from "@/module/cctv/TableCctv";
import Link from "next/link";

export default function Cctv() {
  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Cctv</h5>
          <div className="flex gap-3">
            <Link href={"/cctv/create"} className="btn">
              Create
            </Link> 
          </div>
        </div>
        <TableCctv />
      </div>
    </div>
  );
}
