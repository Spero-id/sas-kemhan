"use client";

import { Footer } from '@/components/Manage/Layout/footer';
import { Sidebar } from '@/components/Manage/Layout/sidebar';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';


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
    <>

      {loading ? (
        <div className="flex flex-col items-center gap-2 justify-center fixed inset-0 z-50 transition-opacity duration-700 ease-in-out">
          {/* <img
            className="h-[30px] max-w-none"
            // src={toAbsoluteUrl('/media/app/mini-logo.svg')}
            alt="logo"
          /> */}
          <span className="loading loading-bars loading-md"></span>
          {/* <div className="text-muted-foreground font-medium text-sm">
            Loading...
          </div> */}
        </div>
      ) : (
        <div className="flex grow">
          <Sidebar />
          <div className="flex flex-col min-h-screen lg:flex-row grow pt-[60px] lg:pt-0 p-[15px]">
            <div className="flex flex-col grow items-stretch rounded-xl bg-background border border-input lg:ms-[270px] mt-0 lg:mt-[15px] ">
              <div className="flex flex-col grow kt-scrollable-y-auto [--kt-scrollbar-width:auto] pt-5">
                <main className="grow" role="content">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


// "use client";

// import "./asset/css/main.css";
// import "./asset/css/data-tables-css.css";
// import { useState, useEffect } from "react";
// import Loader from "@/components/common/Loader";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
// const router = useRouter();
// const { status } = useSession();

// useEffect(() => {
//   if (status !== "loading" && status !== "authenticated") {
//     router.push("/api/auth/signin");
//   }
// }, [status, router]);

// const [loading, setLoading] = useState<boolean>(true);

// useEffect(() => {
//   setTimeout(() => setLoading(false), 1000);
// }, []);

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="drawer">
//           <input id="sidebar" type="checkbox" className="drawer-toggle" />
//           <div className="drawer-content bg-slate-50 min-h-screen pb-10">
//             {/* <!-- ===== Header Start ===== --> */}
//             <Header />
//             {/* <!-- ===== Header End ===== --> */}

//             {/* <!-- ===== Main Content Start ===== --> */}
//             <main>
//               {children}
//             </main>
//             {/* <!-- ===== Main Content End ===== --> */}
//           </div>
//           <Sidebar />
//         </div>
//       )}
//     </div>
//   );
// }
