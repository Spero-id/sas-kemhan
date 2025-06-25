import { useGetStarBodyWorm } from "@/services/api/body_worm/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import StreamCard from "../StreamCard";

export default function PartialsBodyWorm({
  classParent,
  classStream,
}: Readonly<{ classParent: string; classStream: string }>) {
  const { data, isLoading } = useGetStarBodyWorm();

  return isLoading ? (
    <LoadingGetData />
  ) : (
    <div className={classParent}>
      {data?.data?.map((item: any, i: number) => (
        <div className={classStream} key={i}>
          <StreamCard
            path_slug={item?.path_slug}
            name={item?.name}
            redirect={`/body-worm/${item?.user_id}`}
            type={3}
            star={item?.star}
          />
        </div>
      ))}
    </div>
  );
}
