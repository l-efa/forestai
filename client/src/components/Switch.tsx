interface SwitchProps {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
  label: string;
  labelLocation?: "top" | "down" | "left" | "right";
  style?: "tick" | "switch";
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  label,
  labelLocation = "top",
  style = "switch",
}: SwitchProps) {
  const toggle = () => {
    if (disabled) return;
    onChange?.();
  };
  const isVertical = labelLocation === "top" || labelLocation === "down";
  const labelBefore = labelLocation === "top" || labelLocation === "left";

  const labelSpan = <span className="select-none text-xs">{label}</span>;

  return (
    <label
      className={`flex w-fit items-center gap-1 ${isVertical ? "flex-col" : "flex-row"} ${disabled ? "opacity-50" : ""}`}
    >
      {labelBefore && labelSpan}
      {style === "switch" ? (
        <div
          onClick={toggle}
          className="relative h-6 w-11 cursor-pointer rounded-full border border-surface-divider bg-surface-card shadow-[inset_0_2px_6px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.04)]"
        >
          <div
            className={`absolute inset-0 rounded-full bg-greenGradient transition-opacity duration-200 ${
              checked ? "opacity-100" : "opacity-0"
            }`}
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.3)",
            }}
          />
          <div
            className={`absolute left-[3px] top-[3px] h-4 w-4 rounded-full transition-transform duration-200 ${
              checked ? "translate-x-[22px]" : "translate-x-0"
            }`}
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #d4d4d4 100%)",
              boxShadow:
                "0 1px 4px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          />
        </div>
      ) : (
        <div
          onClick={toggle}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-surface-divider bg-surface-card transition-all duration-150 shadow-[inset_0_2px_6px_rgba(0,0,0,0.85),inset_0_1px_3px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.04)]"
        >
          {checked && (
            <svg
              className="h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="url(#greenGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(4,120,87,0.95)" />
                  <stop offset="55%" stopColor="rgba(16,185,129,1)" />
                  <stop offset="100%" stopColor="rgba(52,211,153,0.95)" />
                </linearGradient>
              </defs>
              <path d="M2 6l3 3 5-5" />
            </svg>
          )}
        </div>
      )}
      {!labelBefore && labelSpan}
    </label>
  );
}
