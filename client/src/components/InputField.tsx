interface InputFieldProps {
  name: string;
  value: string;
  type: "text" | "password";
  handleChange: (next: string) => void;
  className?: string | "";
}

export default function InputField({
  name,
  value,
  type,
  handleChange,
  className,
}: InputFieldProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e?.target.value);
  };

  return (
    <input
      className={`mx-3 mb-3 border-b border-content-primary bg-transparent pb-[7px] text-sm text-content-primary outline-none placeholder:text-content-faint ${className}`}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={name}
      autoComplete="off"
    ></input>
  );
}
