import type { NextPageWithLayout } from "./_app";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";

const TerbukaPage: NextPageWithLayout = () => {
  const { data } = useSession();
  return (
    <>
      <main className="w-screen min-h-screen bg-amber-50 p-4">
        <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700">
          Lelang Terbuka
        </h2>

        <pre>{JSON.stringify(data, null, 4)}</pre>
      </main>
    </>
  );
};

export default TerbukaPage;
TerbukaPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
