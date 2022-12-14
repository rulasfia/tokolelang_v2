import LocationIcon from "@components/atoms/icons/LocationIcon";
import DefThumb from "@public/images/def_thumb.png";
import { ClockIcon } from "@radix-ui/react-icons";
import { formatDateTimeLelang } from "@utils/transformers/formatDateTime";
import { rgbDataURL } from "@utils/transformers/formatText";
import Image from "next/image";
import Link from "next/link";

interface ComponentProps {
  id: string;
  image: string;
  location: string;
  title: string;
  openingPrice: number;
  highestBid: number;
  closingDate: string | Date;
}

const ProductCard = (props: ComponentProps) => {
  return (
    <Link href={`/lelang-terbuka/${props.id}`} passHref>
      <a className="flex cursor-pointer flex-col items-start justify-start rounded-lg border border-gray-200 p-2 text-gray-700 hover:border-gray-400">
        <Image
          className="rounded-lg"
          width={400}
          height={300}
          alt={"Product image of " + props.title}
          src={props.image ?? DefThumb}
          placeholder="blur"
          blurDataURL={rgbDataURL(222, 224, 223)}
        />

        {/* location */}
        <div className="mb-1 mt-3 flex flex-row items-center gap-x-2 text-gray-500">
          <LocationIcon className="h-4 w-4" />
          <span className="text-sm font-medium line-clamp-1">
            {props.location}
          </span>
        </div>

        {/* title */}
        <h3 className="mb-4 h-14 text-lg font-bold line-clamp-2">
          {props.title}
        </h3>

        {/* prices */}
        <div className="grid w-full grid-cols-2 items-center justify-between gap-x-2 text-sm">
          <span>Dibuka</span>
          <span className="text-right font-semibold">
            Rp{props.openingPrice}
          </span>
        </div>
        <div className="grid w-full grid-cols-2 items-center justify-between gap-x-2 text-sm">
          <span>Tertinggi</span>
          <span className="text-right font-semibold">Rp3.500.000</span>
        </div>

        {/* closing time */}
        <div className="mt-4 flex flex-row items-center gap-x-2 text-red-600">
          <ClockIcon className="font-semibold" />
          <span className="text-sm font-medium">
            {formatDateTimeLelang(new Date(props.closingDate))}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
