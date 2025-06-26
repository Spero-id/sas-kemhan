import { useGetAllUser } from "@/services/api/user/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import Image from "next/image";
import { User } from "@/types/User/TypeUser";

interface ListUserProps {
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function ListUser({ setUserId }: ListUserProps) {
  const { isLoading, data } = useGetAllUser();

  const handleClickUser = (id: number) => {
    setUserId(id);
  };

  return (
    <div className="p-4 h-96 overflow-y-scroll flex flex-col gap-3 hide-scrollbar">
      <span className="font-medium">List User</span>
      {isLoading ? (
        <LoadingGetData />
      ) : (
        <div className="flex flex-col">
          {data?.data?.map((item: User, i: number) => (
            <button
              className="flex gap-3 items-center hover:bg-slate-50 hover:bg-opacity-5 p-2 cursor-pointer rounded-md"
              key={i}
              onClick={() => {
                if (item.id) {
                  handleClickUser(Number(item.id));
                }
              }}
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
