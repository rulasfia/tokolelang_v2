import LinkTo from "@components/atoms/LinkTo";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { NextPageWithLayout } from "./_app";

const LelangDibuatPage: NextPageWithLayout = () => {
  return (
    <main className="min-h-[calc(100vh-7rem)] w-full p-4">
      <h2 className="text-3xl mb-4 lg:text-5xl md:text-5xl font-extrabold text-gray-700">
        Lelang Dibuat
      </h2>

      <LinkTo asButton href="/lelang-dibuat/baru">
        Buat Lelang Baru
      </LinkTo>
    </main>
  );
};

export default LelangDibuatPage;
LelangDibuatPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
