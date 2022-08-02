import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import type { NextPageWithLayout } from "./_app";

const RiwayatPage: NextPageWithLayout = () => {
  return (
    <>
      <main>
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
