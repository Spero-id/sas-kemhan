import { useGetRandomCctv } from "@/services/api/cctv/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import StreamCard from "../StreamCard";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useEffect } from "react";

export default function PartialsCctv({ limit, classParent, classStream }: Readonly<{ limit: number, classParent: string, classStream: string }>) {
  const { data, isLoading } = useGetRandomCctv(limit);

  return isLoading ? (
    <LoadingGetData />
  ) : (
    <div className={classParent}>
      {data?.data?.map((item: Cctv, i: number) => (
        <div className={classStream} key={i}>
          <StreamCard
            path_slug={item?.path_slug}
            name={item?.name}
            redirect={`/cctv/${item?.id}`}
          />
        </div>
      ))}
    </div>
  );
}
