import { useGetRandomHelmet } from "@/services/api/helmet/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import StreamCard from "../StreamCard";
import Link from "next/link";

export default function PartialsHelmet({
  limit,
}: Readonly<{ limit: number }>) {
  const { data, isLoading } = useGetRandomHelmet(limit);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-yellow-400 font-semibold text-lg mb-2">Helmet</p>
        <Link href="/helmet" className="text-white text-lg">Lainnya</Link>
      </div>
      {isLoading ? (
        <LoadingGetData />
      ) : (
        <div className="flex flex-col gap-4">
          {data?.data?.map((item: any, i: number) => (
            <div className="h-48" key={i}>
              <StreamCard path_slug={item?.path_slug} name={item?.name} redirect={`/helmet/${item?.id}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
