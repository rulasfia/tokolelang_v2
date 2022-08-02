import LinkTo from "@components/atoms/LinkTo";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DefaultAvatar from "../../../../public/images/avatar-min.png";

export default function UserAvatar() {
  const { data } = useSession();

  return (
    <LinkTo href="/profil" className="focus-visible:outline-none">
      <Image
        height={32}
        width={32}
        className="rounded-full"
        src={data?.user?.image ?? DefaultAvatar}
        alt="avatar"
      />
    </LinkTo>
  );
}
