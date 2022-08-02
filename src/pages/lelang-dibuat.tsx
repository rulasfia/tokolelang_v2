import LinkTo from "@components/atoms/LinkTo";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import ProductCard from "@components/organisms/Lelang/ProductCard";
import { getFirstImage, getHighestBid } from "@utils/transformers/formatText";
import { trpc } from "@utils/trpc";
import { NextPageWithLayout } from "./_app";

const LelangDibuatPage: NextPageWithLayout = () => {
  const { data } = trpc.useQuery(["lelang.dibuat"]);

  if (!data) return null;
  return (
    <main>
      <h2 className="mb-6 text-3xl font-extrabold text-gray-700 md:text-4xl lg:text-4xl">
        Lelang Dibuat
      </h2>

      {/* search and sorting */}
      <div className="mb-6 grid w-full grid-cols-6 gap-x-4">
        <LinkTo asButton href="/lelang-dibuat/baru">
          Lelang Baru
        </LinkTo>
        <input
          type="text"
          className="col-span-4 block rounded-lg border-gray-200 text-sm outline-none focus:border-gray-200 focus:outline-none focus:outline-0 focus:ring-2 focus:ring-primary-500"
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
  );
};

export default LelangDibuatPage;
LelangDibuatPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
