import LinkTo from "@components/atoms/LinkTo";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { trpc } from "@utils/trpc";
import { NextPageWithLayout } from "./_app";

const LelangDibuatPage: NextPageWithLayout = () => {
  const { data } = trpc.useQuery(["lelang.dibuat"]);

  return (
    <main className="min-h-[calc(100vh-7rem)] w-full p-4">
      <h2 className="mb-4 text-3xl font-extrabold text-gray-700 md:text-5xl lg:text-5xl">
        Lelang Dibuat
      </h2>

      <LinkTo asButton href="/lelang-dibuat/baru">
        Buat Lelang Baru
      </LinkTo>

      <div>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </main>
  );
};

export default LelangDibuatPage;
LelangDibuatPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
