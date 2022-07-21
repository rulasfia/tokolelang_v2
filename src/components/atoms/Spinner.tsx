type ComponentProps = {
  withContainer?: boolean;
  withText?: boolean;
};

const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gray-700 animate-spin"
    >
      <circle
        className="opacity-[0.25]"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-[0.75]"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const LoadingSpinner = ({
  withContainer = false,
  withText = false,
}: ComponentProps) => {
  if (withContainer) {
    return (
      <div className="flex w-fit flex-row justify-center items-center font-medium gap-x-3 p-4 mx-auto">
        <Spinner />
        {withText ? "Loading..." : null}
      </div>
    );
  }

  return <Spinner />;
};

export default LoadingSpinner;
