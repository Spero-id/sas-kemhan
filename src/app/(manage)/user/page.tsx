"use client";

import TableUser from "@/module/user/TableUser";
import Link from "next/link";

export default function User() {
  return (
    <div className="p-4 w-full bg-white rounded">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold">User</h5>
        <Link href={"/user/create"} className="btn">
          Create
        </Link>
      </div>

      <TableUser />
    </div>
  );
}
