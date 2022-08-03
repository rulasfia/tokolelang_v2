import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface ComponentProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  rows?: number;
}

const Statefull = ({ id, rows = 3, ...others }: ComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <textarea
      {...register(id)}
      id={id}
      name={id}
      rows={rows}
      {...others}
      className={clsx(
        "rounded-lg disabled:cursor-not-allowed sm:text-sm",
        errors && errors[id]
          ? "border-red-600 focus:border-red-800 focus:ring-2 focus:ring-red-800  "
          : "border-gray-200 hover:border-gray-400 focus:border-gray-200 focus:ring-2 focus:ring-primary-500 "
      )}
    />
  );
};

const Stateless = ({ id, rows = 3, ...others }: ComponentProps) => {
  return (
    <textarea
      id={id}
      name={id}
      rows={rows}
      {...others}
      className={clsx(
        "rounded-lg disabled:cursor-not-allowed sm:text-sm",
        "border-gray-200 focus:border-gray-200 focus:ring-2 focus:ring-primary-500 "
      )}
    />
  );
};

/** exported component */

interface TextFieldProps extends ComponentProps {
  statefull?: boolean;
}

const TextArea = (props: TextFieldProps) => {
  const { statefull } = props;
  const updatedProps = { ...props };

  delete updatedProps.statefull;

  if (statefull) {
    return <Statefull {...updatedProps} />;
  }

  return <Stateless {...updatedProps} />;
};

export default TextArea;
