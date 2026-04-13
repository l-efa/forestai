interface ButtonProps {
  name: string;
  changeHandler: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
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
      className={`text-content-primary m-2 rounded-xl px-8 py-[9px] text-sm font-medium transition-all duration-150 will-change-transform hover:brightness-[1.6] active:scale-95 active:brightness-90 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(28,28,30,0.98) 0%, rgba(10,10,11,0.99) 60%, rgba(5,5,6,1) 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 -8px 16px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4)",
      }}
    >
      {name}
    </button>
  );
}
