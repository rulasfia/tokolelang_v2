import type { SubmitHandler } from "react-hook-form";
import type { INewLelangSchema } from "@utils/validation/lelangSchema";
import type { NextPageWithLayout } from "@pages/_app";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import { trpc } from "@utils/trpc";
import { useZodForm } from "@utils/hooks/useZodForm";
import { newLelangSchema } from "@utils/validation/lelangSchema";
import Button from "@components/atoms/Button";
import CreateNewKategori from "@components/organisms/Kategori/CreateNewKategori";

const LelangBaruPage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const utils = trpc.useContext();
  const { data: categories } = trpc.useQuery(["kategori.all"]);
  const createLelang = trpc.useMutation("lelang.create", {
    onSuccess: () => {
      utils.invalidateQueries("lelang.all");
    },
  });

  const methods = useZodForm({
    schema: newLelangSchema,
    defaultValues: {
      name: "",
      description: "",
      openingPrice: "",
      closingDate: new Date(),
      categoryID: "",
    },
  });

  const onSubmitHandler: SubmitHandler<INewLelangSchema> = async (values) => {
    if (!!sessionData && sessionData.user?.id) {
      try {
        createLelang.mutate({ data: values, userId: sessionData.user.id });

        router.push("/lelang-dibuat");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main>
      <h2>Lelang Baru</h2>

      <form
        onSubmit={methods.handleSubmit(onSubmitHandler)}
        className="flex w-2/5 flex-col gap-x-3 p-6"
        noValidate
      >
        <div className="mb-6 flex flex-col gap-x-3">
          <label htmlFor="name">Nama </label>
          <input type="text" id="name" {...methods.register("name")} />
          {methods.formState.errors.name?.message && (
            <p className="text-red-700">
              {methods.formState.errors.name?.message}
            </p>
          )}

          <label htmlFor="description">Deskripsi Barang</label>
          <textarea id="description" {...methods.register("description")} />
          {methods.formState.errors.description?.message && (
            <p className="text-red-700">
              {methods.formState.errors.description?.message}
            </p>
          )}

          <label htmlFor="openingPrice">Harga Pembukaan</label>
          <input
            type="text"
            id="openingPrice"
            pattern="^[0-9]*$"
            {...methods.register("openingPrice")}
          />
          {methods.formState.errors.openingPrice?.message && (
            <p className="text-red-700">
              {methods.formState.errors.openingPrice?.message}
            </p>
          )}

          <label htmlFor="closingDate">Tanggal Penutupan Lelang</label>
          <input
            type="datetime-local"
            id="closingDate"
            {...methods.register("closingDate")}
          />
          {methods.formState.errors.closingDate?.message && (
            <p className="text-red-700">
              {methods.formState.errors.closingDate?.message}
            </p>
          )}

          <label htmlFor="categoryID">Kategori Barang</label>
          <div className="flex flex-row gap-x-3">
            <select {...methods.register("categoryID")} className="w-3/5">
              {categories?.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <CreateNewKategori />
          </div>
        </div>

        <Button type="submit">
          {createLelang.isLoading ? "Loading..." : "Buat Lelang Baru"}
        </Button>
      </form>
    </main>
  );
};

export default LelangBaruPage;
LelangBaruPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
