import { useState } from "react";
import { useGetAllUser } from "@/services/api/user/get/get.hooks";
import LoadingGetData from "../Loading/LoadingGetData";
import Image from "next/image";
import { User } from "@/types/User/TypeUser";
import { Input } from "react-daisyui";

interface ListUserProps {
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function ListUser({ setUserId }: Readonly<ListUserProps>) {
  const { isLoading, data } = useGetAllUser();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleClickUser = (id: number) => {
    setUserId(id);
  };

  // Filter user by name (case-insensitive)
  const filteredUsers = data?.data?.filter((user: User) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 h-[25rem]">
      <span className="font-medium">List User</span>

      <Input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full my-2"
      />

      <div className="overflow-y-scroll hide-scrollbar h-[17rem]">
        {isLoading ? (
          <LoadingGetData />
        ) : (
          <div className="flex flex-col">
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((item: User, i: number) => (
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
              ))
            ) : (
              <span className="text-sm text-gray-500 p-2">No users found</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
