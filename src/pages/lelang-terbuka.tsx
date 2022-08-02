import LocationIcon from "@components/atoms/icons/LocationIcon";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import ProductCard from "@components/organisms/Lelang/ProductCard";
import { getFirstImage, getHighestBid } from "@utils/transformers/formatText";
import { trpc } from "@utils/trpc";
import type { NextPageWithLayout } from "./_app";

const LelangTerbukaPage: NextPageWithLayout = () => {
  const { data } = trpc.useQuery(["lelang.terbuka"]);

  if (!data) return null;
  return (
    <>
      <main>
        <h2 className="text-3xl font-extrabold text-gray-700 md:text-4xl lg:text-4xl">
          Lelang Terbuka
        </h2>

        {/* search and sorting */}
        <div className="my-6 grid h-11 w-full grid-cols-6 gap-x-4">
          <input
            type="text"
            className="col-span-5 block w-full rounded-lg border-gray-200 text-sm outline-none focus:border-gray-200 focus:outline-none focus:outline-0 focus:ring-2 focus:ring-primary-500"
            placeholder="Cari barang atau lokasi ..."
          />

          {/* temporary */}
          <input
            type="text"
            className="block rounded-lg border-gray-200 text-sm outline-none focus:border-gray-200 focus:outline-none focus:outline-0 focus:ring-2 focus:ring-primary-500"
            placeholder="Urutkan: Terbaru"
            disabled
          />
        </div>

        {/* products listing */}
        <article className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.name}
              image={getFirstImage(item.images)}
              location={item.location}
              openingPrice={item.openingPrice}
              highestBid={getHighestBid(item.offers)}
              closingDate={item.closingDate}
            />
          ))}
        </article>

        {/*  */}
      </main>
    </>
  );
};

export default LelangTerbukaPage;
LelangTerbukaPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
