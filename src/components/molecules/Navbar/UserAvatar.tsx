import LinkTo from "@components/atoms/LinkTo";
import { rgbDataURL } from "@utils/transformers/formatText";
import { useSession } from "next-auth/react";
import Image from "next/future/image";
import DefaultAvatar from "../../../../public/images/avatar-min.png";

export default function UserAvatar() {
  const { data } = useSession();

  return (
    <LinkTo href="/profil" className="focus-visible:outline-none">
      <Image
        height={36}
        width={36}
        className="rounded-full"
        src={data?.user?.image ?? DefaultAvatar}
        alt="avatar"
        placeholder="blur"
        blurDataURL={rgbDataURL(222, 224, 223)}
      />
    </LinkTo>
  );
}