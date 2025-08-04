"use client";

import "./asset/css/main.css";
import "./asset/css/data-tables-css.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="drawer">
          <input id="sidebar" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-slate-50 min-h-screen pb-10">
            {/* <!-- ===== Header Start ===== --> */}
            <Header />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              {children}
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  );
}