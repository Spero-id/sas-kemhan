"use client";

import TableLayout from "@/module/layout/TableLayout";

export default function Layout() {
  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Layout</h5>
        </div>
        <TableLayout />
      </div>
    </div>
  );
}
