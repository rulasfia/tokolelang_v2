import LocationIcon from "@components/atoms/icons/LocationIcon";
import DefThumb from "@public/images/def_thumb.png";
import { ClockIcon } from "@radix-ui/react-icons";
import Image from "next/future/image";

interface ComponentProps {
  imgUrl: string;
  location: string;
  tile: string;
  openingPrice: number;
  highestBid: number;
  closingTime: string | Date;
}

const ProductCard = () => {
  return (
    <div className="flex cursor-pointer flex-col items-start justify-start rounded-lg border border-gray-200 p-2 text-gray-700 hover:border-gray-400">
      <Image
        className="mb-3 rounded-lg"
        width={400}
        height={300}
        alt="Product Image"
        src={DefThumb}
      />

      {/* location */}
      <div className="mb-1 flex flex-row items-center gap-x-2 text-gray-500">
        <LocationIcon className="h-4 w-4" />
        <span className="text-sm font-medium line-clamp-1">Malang</span>
      </div>

      {/* title */}
      <h3 className="mb-4 h-14 text-lg font-bold line-clamp-2">
        Standard Mountain Bike
      </h3>

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
  );
};

export default ProductCard;
