"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "@/components/HeaderDashboard";
import Chat from "@/components/Chat";
import StreamFullScreenModal from "@/components/Modal/StreamModal";
import { Button } from "react-daisyui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { status } = useSession();





  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-dark-ocean lg:p-8 overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <HeaderDashboard />
            <main className="px-4 lg:p-0">
              {children}
            </main>
          </div>
          <Chat />
          <StreamFullScreenModal />
        </div>
      )}
    </div>
  );
}






