interface ProgressBarType {
  startNumber: number;
  endNumber: number;
  label: string;
}

export default function ProgressBar({
  startNumber,
  endNumber,
  label = "Progress",
}: ProgressBarType) {
  const safeEnd = endNumber === 0 ? 1 : endNumber;
  const percent = (startNumber / safeEnd) * 100;
  const barPercent = Math.min(100, Math.max(0, percent));

  return (
    <section
      className="font-card w-full max-w-md rounded-xl p-4 bg-darkGloss shadow-cardDrop shadow-cardGlow"
    >
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-content-bright">
        <p>{label}</p>
        <p className="font-bold">
          {startNumber} / {endNumber}
        </p>
      </div>

      <div className="mb-2 text-xs font-semibold text-forest-300">
        {percent.toFixed(1)}%
      </div>

      <div
        role="progressbar"
        aria-valuenow={startNumber}
        aria-valuemin={0}
        aria-valuemax={endNumber}
        className="relative h-3 w-full overflow-hidden rounded-full border border-surface-divider p-0.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 35%, rgba(0,0,0,0.55) 100%)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -4px 8px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        <div
          className="bg-greenGradient h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${barPercent}%`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 12px rgba(16,185,129,0.45)",
          }}
        />
      </div>
    </section>
  );
}
