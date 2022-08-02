import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { useSession } from "next-auth/react";
import type { NextPageWithLayout } from "./_app";

const PesanPage: NextPageWithLayout = () => {
  const { data } = useSession();
  return (
    <>
      <main>
        <h2 className="text-[3rem] font-extrabold text-gray-700 md:text-[5rem] lg:text-[5rem]">
          Pesan Page
        </h2>

        <pre>{JSON.stringify(data, null, 4)}</pre>
      </main>
    </>
  );
};

export default PesanPage;
PesanPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
