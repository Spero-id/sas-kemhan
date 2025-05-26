"use client";

import TableRole from "@/module/role/TableRole";
import Link from "next/link";

export default function Role() {
  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Role</h5>
          <Link href={"/role/create"} className="btn">
            Create
          </Link>
        </div>
        <TableRole />
      </div>
    </div>
  );
}
