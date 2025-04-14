"use client";

import TableGalery from "@/module/user/TableGalery";
import Link from "next/link";

export default function Galery() {
  return (
    <div className="p-4 w-full bg-white rounded">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold">Galery</h5>
        <Link href={"/galery/create"} className="btn">
          Create
        </Link>
      </div>

      <TableGalery />
    </div>
  );
}
