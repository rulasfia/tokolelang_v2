import type { NextPageWithLayout } from "./_app";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { trpc } from "@utils/trpc";

const TerbukaPage: NextPageWithLayout = () => {
  // const { data } = useSession();
  const { data } = trpc.useQuery(["lelang.terbuka"]);

  return (
    <>
      <main className="min-h-screen w-screen p-4">
        <h2 className="text-3xl font-extrabold text-gray-700 md:text-5xl lg:text-5xl">
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
