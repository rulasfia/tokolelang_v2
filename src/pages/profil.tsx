import Button from "@components/atoms/Button";
import LoadingSpinner from "@components/atoms/Spinner";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import type { NextPageWithLayout } from "./_app";

const ProfilPage: NextPageWithLayout = () => {
  const { data } = useSession();

  const onSignOut = () => {
    signOut({
      callbackUrl: "http://localhost:3412",
    });
  };

  if (!data?.user) return <LoadingSpinner withContainer />;

  return (
    <>
      <main>
        <h2 className="mb-3 text-3xl font-extrabold text-gray-700 md:text-4xl lg:text-4xl">
          Profil
        </h2>

        <Button type="button" onPress={onSignOut}>
          Sign Out
        </Button>
        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        <section className="my-4 flex flex-col items-start">
          <Image
            className="rounded-lg"
            height={240}
            width={240}
            alt={"avatar of " + data?.user?.name}
            src={data?.user?.image ?? "/images/avatar-min.png"}
          />
          <div className="mt-4 ">
            <h3>Nama: {data?.user?.name}</h3>
            <h3>Email: {data?.user?.email}</h3>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilPage;
ProfilPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
