import TableListRecording from "@/module/recording/TableListRecording";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function Recording({
  params,
}: Readonly<{ params: { type: string; path_slug: string } }>) {

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex items-center">
          <Link href={`/manage/${params.type}`}>
            <MdOutlineKeyboardArrowLeft className="text-2xl text-slate-600" /> 
          </Link>
          <h5 className="text-xl font-bold text-slate-600">List recording ({params.path_slug})</h5>
        </div>

        <TableListRecording type={params.type} path_slug={params.path_slug} />
      </div>
    </div>
  );
}