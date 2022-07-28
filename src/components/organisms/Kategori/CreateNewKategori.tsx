import type { SubmitHandler } from "react-hook-form";
import type { INewKategoriSchema } from "@utils/validation/kategoriSchema";
import DialogProvider from "@components/molecules/Dialog/DialogProvider";
import DialogContent from "@components/molecules/Dialog/DialogContent";
import { useRef, useState } from "react";
import { trpc } from "@utils/trpc";
import { useZodForm } from "@utils/hooks/useZodForm";
import { newKategoriSchema } from "@utils/validation/kategoriSchema";
import { useSession } from "next-auth/react";
import Button from "@components/atoms/Button";

const CreateNewKategori = () => {
  const { data: sessionData } = useSession();
  const dialogContentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((cv) => !cv);

  const utils = trpc.useContext();
  const { data: categories } = trpc.useQuery(["kategori.all"]);
  const createKategori = trpc.useMutation("kategori.create", {
    onSuccess: () => {
      utils.invalidateQueries("kategori.all");
    },
  });

  const methods = useZodForm({
    schema: newKategoriSchema,
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmitHandler: SubmitHandler<INewKategoriSchema> = async (values) => {
    if (!!sessionData && sessionData.user?.id) {
      try {
        createKategori.mutate(values);

        methods.resetField("name");
        methods.resetField("description");
        toggleModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <DialogProvider
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      title="Buat Kategori Baru"
      trigger={
        <button type="button" className="w-2/5 text-sm">
          Buat
        </button>
      }
    >
      <form
        className="flex flex-col gap-y-2"
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        <label htmlFor="name">Nama Kategori</label>
        <input type="text" id="name" {...methods.register("name")} />

        <label htmlFor="description">Deskripsi Kategori</label>
        <input
          type="text"
          id="description"
          {...methods.register("description")}
        />

        <Button type="submit">
          {createKategori.isLoading ? "Loading..." : "Buat Kategori"}
        </Button>
      </form>
    </DialogProvider>
  );
};

export default CreateNewKategori;
