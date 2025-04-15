"use client";

import TableUser from "@/module/user/TableUser";
import Link from "next/link";

export default function User() {
  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold">User</h5>
          <Link href={"/user/create"} className="btn">
            Create
          </Link>
        </div>

        <TableUser />
      </div>
    </div>
  );
}
