import LocationIcon from "@components/atoms/icons/LocationIcon";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import ProductCard from "@components/organisms/Lelang/ProductCard";
import { trpc } from "@utils/trpc";
import type { NextPageWithLayout } from "./_app";

const TerbukaPage: NextPageWithLayout = () => {
  // const { data } = useSession();
  const { data } = trpc.useQuery(["lelang.terbuka"]);

  return (
    <>
      <main>
        <h2 className="text-3xl font-extrabold text-gray-700 md:text-4xl lg:text-4xl">
          Lelang Terbuka
        </h2>

        {/* search and sorting */}
        <div className="my-6 w-full">
          <input
            type="text"
            className="block w-full rounded-lg border-gray-200 text-sm outline-none focus:border-gray-200 focus:outline-none focus:outline-0 focus:ring-2 focus:ring-primary-500"
            placeholder="Cari barang atau lokasi ..."
          />
        </div>

        {/* products listing */}
        <article className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <ProductCard key={item} />
          ))}
        </article>

        {/*  */}
      </main>
    </>
  );
};

export default TerbukaPage;
TerbukaPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
