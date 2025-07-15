export default function SearchInput({
  height = "h-5",
  placeholder = "",
  value,

  onChange,
}: {
  height?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={"text"}
      placeholder={placeholder}
      className={`${height} border-1 border-gray-400 rounded-lg p-2 text-xl w-70`}
    />
  );
}
