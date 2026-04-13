interface ButtonProps {
  name: string;
  changeHandler: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button2({
  name,
  changeHandler,
  className = "",
  disabled = false,
}: ButtonProps) {
  const onClick = () => {
    changeHandler();
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-surface-black m-2 rounded-xl bg-greenGradient px-8 py-2 text-sm font-bold transition-all duration-150 hover:brightness-125 active:scale-95 active:brightness-90 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      style={{
        border: "1px solid rgba(52,211,153,0.3)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(16,185,129,0.15)",
      }}
    >
      {name}
    </button>
  );
}
