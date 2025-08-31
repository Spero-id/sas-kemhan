import { useGetStarCctv } from "@/services/api/cctv/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import StreamCard from "../StreamCard";
import { Cctv } from "@/types/Cctv/TypeCctv";

export default function PartialsCctv({ classParent, classStream }: Readonly<{ classParent: string, classStream: string }>) {
  const { data, isLoading } = useGetStarCctv(1000);

  return isLoading ? (
    <LoadingGetData />
  ) : (
    <div className={classParent}>
      {data?.data?.map((item: Cctv, i: number) => (
        <div className={classStream} key={i}>
          <StreamCard
            active={item?.status}
            is_detail={true}
            path_slug={item?.path_slug}
            name={item?.name}
            redirect={`/cctv/${item?.id}`}
            type={1}
            star={item?.star}
          />
        </div>
      ))}
    </div>
  );
}
