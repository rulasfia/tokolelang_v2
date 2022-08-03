import Button from "@components/atoms/Button";
import ComboBox, { Item } from "@components/atoms/input/ComboBox";
import Label from "@components/atoms/input/Label";
import TextArea from "@components/atoms/input/TextArea";
import TextField, { InputError } from "@components/atoms/input/TextField";
import TimeField from "@components/atoms/input/TimeField";
import AuthenticatedLayout from "@components/layouts/AuthenticatedLayout";
import CreateNewKategori from "@components/organisms/Kategori/CreateNewKategori";
import { Time } from "@internationalized/date";
import type { NextPageWithLayout } from "@pages/_app";
import { useZodForm } from "@utils/hooks/useZodForm";
import {
  formatDateInput,
  formatDateTimeInput,
  formatTime,
  formatTimeInput,
} from "@utils/transformers/formatDateTime";
import { trpc } from "@utils/trpc";
import type { INewLelangSchema } from "@utils/validation/lelangSchema";
import { newLelangSchema } from "@utils/validation/lelangSchema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Controller, FormProvider, SubmitHandler } from "react-hook-form";

const LelangBaruPage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const [controlledForms, setControlledForms] = useState({
    date: formatDateInput(new Date()),
    time: formatTimeInput(new Date()),
  });

  // console.log(formatTimeInput(new Date()));

  const utils = trpc.useContext();
  const { data: categories } = trpc.useQuery(["kategori.all"]);
  const createLelang = trpc.useMutation("lelang.create", {
    onSuccess: async () => {
      await utils.invalidateQueries("lelang.dibuat");
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
      location: "",
    },
  });

  if (Object.keys(methods.formState.errors).length > 0)
    console.log(methods.formState.errors);

  const onSubmitHandler: SubmitHandler<INewLelangSchema> = async (values) => {
    console.log("submit");
    if (!!sessionData && sessionData.user?.id) {
      try {
        const closingDate = new Date(
          `${controlledForms.date}T${controlledForms.time.toString()}`
        );

        createLelang.mutateAsync({
          data: { ...values, closingDate },
          userId: sessionData.user.id,
        });

        router.push("/lelang-dibuat");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main>
      <h2 className="text-3xl font-extrabold text-gray-700 md:text-4xl lg:text-4xl">
        Buat Lelang Baru
      </h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          className="flex w-2/5 flex-col gap-x-3 p-6"
          noValidate
        >
          <div className="mb-6 flex flex-col gap-x-3">
            <Label id="name">Nama Barang</Label>
            <TextField statefull type="text" id="name" />
            {methods.formState.errors.name?.message && (
              <InputError>{methods.formState.errors.name?.message}</InputError>
            )}

            <br />
            <Label id="description">Deskripsi Barang</Label>
            <TextArea statefull id="description" />
            {methods.formState.errors.description?.message && (
              <InputError>
                {methods.formState.errors.description?.message}
              </InputError>
            )}

            <br />
            <Label id="openingPrice">Harga Pembukaan</Label>
            <TextField
              statefull
              type="text"
              id="openingPrice"
              pattern="^[0-9]*$"
            />
            {methods.formState.errors.openingPrice?.message && (
              <InputError>
                {methods.formState.errors.openingPrice?.message}
              </InputError>
            )}

            <br />
            <Label id="closingDate">Tanggal & Waktu Penutupan Lelang</Label>
            <div className="flex flex-row items-center gap-x-3">
              <TextField
                style={{ width: "100%" }}
                type="date"
                id="closingDate"
                value={controlledForms.date}
                onChange={(e) =>
                  setControlledForms((cv) => ({
                    ...cv,
                    date: formatDateInput(new Date(e.target.value)),
                  }))
                }
              />
              <TimeField
                locale="id-ID"
                label="closing time"
                hourCycle={24}
                value={controlledForms.time}
                onChange={(e) =>
                  setControlledForms((cv) => ({
                    ...cv,
                    time: new Time(e.hour, e.minute),
                  }))
                }
              />
            </div>

            {methods.formState.errors.closingDate?.message && (
              <InputError>
                {methods.formState.errors.closingDate?.message}
              </InputError>
            )}

            <br />
            <Label id="location">Lokasi</Label>
            <TextField statefull type="text" id="location" />
            {methods.formState.errors.location?.message && (
              <InputError>
                {methods.formState.errors.location?.message}
              </InputError>
            )}

            <br />
            <Label id="categoryID">Kategori Barang</Label>
            <div className="flex flex-row items-center gap-x-3">
              {categories && (
                <Controller
                  name="categoryID"
                  control={methods.control}
                  render={({ field }) => (
                    <ComboBox
                      label="kategori barang"
                      items={categories}
                      onSelectionChange={field.onChange}
                      {...field}
                    >
                      {/* @ts-ignore */}
                      {(item: typeof categories[number]) => (
                        <Item key={item.id}>{item.name}</Item>
                      )}
                    </ComboBox>
                  )}
                />
              )}

              <CreateNewKategori />
            </div>
            {methods.formState.errors.categoryID?.message && (
              <InputError>
                {methods.formState.errors.categoryID?.message}
              </InputError>
            )}
          </div>

          <Button type="submit">
            {createLelang.isLoading ? "Loading..." : "Buat Lelang Baru"}
          </Button>
        </form>
      </FormProvider>
    </main>
  );
};

export default LelangBaruPage;
LelangBaruPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
