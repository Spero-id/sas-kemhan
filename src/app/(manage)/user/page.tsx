"use client";

import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableUser from "@/module/user/TableUser";
import Link from "next/link";

export default function User() {
  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">User</h5>
          <div className="flex gap-3">
            <ButtonGenerateMediaMTX />
            <Link href={"/user/create"} className="btn">
              Create
            </Link>
          </div>
        </div>
        <TableUser />
      </div>
    </div>
  );
}
