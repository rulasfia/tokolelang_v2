import LocationIcon from "@components/atoms/icons/LocationIcon";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { ClockIcon } from "@radix-ui/react-icons";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/future/image";
import DefThumb from "../../public/images/def_thumb.png";
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
            <div
              key={item}
              className="flex cursor-pointer flex-col items-start justify-start rounded-lg border border-gray-200 p-2 text-gray-700 hover:border-gray-400"
            >
              <Image
                className="mb-3 rounded-lg"
                width={400}
                height={300}
                alt="Product Image"
                src={DefThumb}
              />

              {/* location */}
              <div className="mb-3 flex flex-row items-center gap-x-2 text-gray-500">
                <LocationIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Malang</span>
              </div>

              {/* title */}
              <h3 className="mb-4 text-lg font-bold">Standard Mountain Bike</h3>

              {/* prices */}
              <div className="grid w-full grid-cols-2 items-center justify-between gap-x-2 text-sm">
                <span>Dibuka</span>
                <span className="text-right font-semibold">Rp2.000.000</span>
              </div>
              <div className="grid w-full grid-cols-2 items-center justify-between gap-x-2 text-sm">
                <span>Tertinggi</span>
                <span className="text-right font-semibold">Rp3.500.000</span>
              </div>

              {/* closing time */}
              <div className="mt-4 flex flex-row items-center gap-x-2 text-red-600">
                <ClockIcon className="font-semibold" />
                <span className="text-sm font-medium">12/08/2022 - 15:00</span>
              </div>
            </div>
          ))}
        </article>

        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      </main>
    </>
  );
};

export default TerbukaPage;
TerbukaPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
