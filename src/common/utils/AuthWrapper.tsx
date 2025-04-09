"use client";

import { axiosClient, setClientToken } from "@/common/utils/AxiosClient";
import { useSession } from "next-auth/react";
import React from "react";

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const { data, status } = useSession();
  
  if (status !== "loading") {
    setClientToken({
      token: data?.token ?? "",
      instance: axiosClient,
    });
  }

  return <div>{children}</div>;
}
