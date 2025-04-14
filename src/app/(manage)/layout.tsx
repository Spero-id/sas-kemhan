"use client";

import "./asset/css/main.css";
import "./asset/css/data-tables-css.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";

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
  }, [status]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="max-h-screen min-h-screen bg-dark-ocean p-8 overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Navigation Start ===== --> */}
            <Navigation search="" />
            {/* <!-- ===== Navigation End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              {children}
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </div>
  );
}
