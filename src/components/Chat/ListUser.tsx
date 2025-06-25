import { useGetAllUser } from "@/services/api/user/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import Image from "next/image";
import { User } from "@/types/User/TypeUser";

export default function ListUser() {
  const { isLoading, data } = useGetAllUser();

  return (
    <div className="p-4 h-80 overflow-y-scroll flex flex-col gap-3 hide-scrollbar">
      {isLoading ? (
        <LoadingGetData />
      ) : (
        <div className="flex flex-col">
          {data?.data?.map((item: User, i: number) => (
            <div
              className="flex gap-3 items-center hover:bg-slate-50 hover:bg-opacity-5 p-2 cursor-pointer rounded-md"
              key={i}
            >
              <div className="avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <Image
                    src={item.image ?? "/images/profile.png"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
              <span>{item?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
