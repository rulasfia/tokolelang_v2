import clsx from "clsx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  leftIcon?: JSX.Element;
}

/** Statefull Text Input Component */

const Statefull = ({ leftIcon, type, id, ...others }: ComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [eyeOn, setEyeOn] = useState(false);

  if (leftIcon)
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {leftIcon}{" "}
        </div>
        <input
          {...register(id)}
          type={type}
          id={id}
          name={id}
          {...others}
          className={clsx(
            "block w-full rounded-lg pl-10 disabled:cursor-not-allowed disabled:bg-gray-200    sm:text-sm",
            errors && errors[id]
              ? "border-red-600 focus:border-red-800 focus:ring-2 focus:ring-red-800 "
              : "border-gray-200 hover:border-gray-400 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:hover:border-transparent "
          )}
        />
      </div>
    );

  return (
    <input
      {...register(id)}
      type={type}
      id={id}
      name={id}
      {...others}
      className={clsx(
        "block rounded-lg disabled:cursor-not-allowed disabled:bg-gray-200 sm:text-sm",
        errors && errors[id]
          ? "border-red-600 focus:border-red-800 focus:ring-2 focus:ring-red-800 "
          : "border-gray-200 hover:border-gray-400 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:hover:border-transparent "
      )}
    />
  );
};

/** Stateless Text Input Component */

const Stateless = ({ id, type, leftIcon, ...others }: ComponentProps) => {
  if (leftIcon)
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {leftIcon}{" "}
        </div>
        <input
          type={type}
          id={id}
          name={id}
          {...others}
          className={clsx(
            "block w-full rounded-lg pl-10 disabled:cursor-not-allowed disabled:bg-gray-200    sm:text-sm",
            "border-gray-200 hover:border-gray-400 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:hover:border-transparent "
          )}
        />
      </div>
    );

  return (
    <input
      type={type}
      id={id}
      name={id}
      {...others}
      className={clsx(
        "block rounded-lg disabled:cursor-not-allowed disabled:bg-gray-200 sm:text-sm",
        "border-gray-200 hover:border-gray-400 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:hover:border-transparent "
      )}
    />
  );
};

/** error message */
export const InputError = ({ children }: { children: string }) => {
  return <p className="text-sm font-medium text-red-700">{children}</p>;
};

/** exported component */

interface TextFieldProps extends ComponentProps {
  statefull?: boolean;
}

const TextField = (props: TextFieldProps) => {
  const { statefull } = props;
  const updatedProps = { ...props };

  delete updatedProps.statefull;

  if (statefull) {
    return <Statefull {...updatedProps} />;
  }

  return <Stateless {...updatedProps} />;
};

export default TextField;
