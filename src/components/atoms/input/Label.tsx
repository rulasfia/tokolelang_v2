interface Props {
  id: string;
  children: string;
}

export default function Label({ children = "label", id }: Props) {
  return (
    <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}
