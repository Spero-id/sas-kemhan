import { useGetRandomBodyWorm } from "@/services/api/body_worm/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import StreamCard from "../StreamCard";

export default function PartialsBodyWorm({
  limit,
  classParent,
  classStream,
}: Readonly<{ limit: number; classParent: string; classStream: string }>) {
  const { data, isLoading } = useGetRandomBodyWorm(limit);

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
          />
        </div>
      ))}
    </div>
  );
}
