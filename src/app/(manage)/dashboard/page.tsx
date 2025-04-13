"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-4 w-full bg-white rounded">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold">Galery</h5>
        <Link href={"/galery/create"} className="btn">
          Create
        </Link>
      </div>
    </div>
  );
}
