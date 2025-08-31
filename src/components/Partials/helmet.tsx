import { useGetStarHelmet } from "@/services/api/helmet/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import StreamCard from "../StreamCard";

export default function PartialsHelmet({ classParent, classStream }: Readonly<{ classParent: string, classStream: string }>) {
  const { data, isLoading } = useGetStarHelmet();

  return isLoading ? (
    <LoadingGetData />
  ) : (
    <div className={classParent}>
      {data?.data?.map((item: any, i: number) => (
        <div className={classStream} key={i}>
          <StreamCard
            active={item?.status}
            is_detail={false}
            path_slug={item?.path_slug}
            name={item?.name}
            redirect={`/helmet/${item?.id}`}
            type={2}
            star={item?.star}
          />
        </div>
      ))}
    </div>
  );
}
