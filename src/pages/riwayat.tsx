import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "./_app";

const RiwayatPage: NextPageWithLayout = () => {
  return (
    <>
      <main className="min-h-screen bg-amber-50 p-4">
        <h2 className="text-[3rem] font-extrabold text-gray-700 md:text-[5rem] lg:text-[5rem]">
          Riwayat Page
        </h2>
      </main>
    </>
  );
};

export default RiwayatPage;
RiwayatPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
