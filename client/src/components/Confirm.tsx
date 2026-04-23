import Button from "./Button";
import Button2 from "./Button2";

type ConfirmType = {
  info: string;
  confirmButton: string;
  cancelButton: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Confirm({
  info,
  confirmButton,
  cancelButton,
  onConfirm,
  onCancel,
}: ConfirmType) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-surface-border bg-surface-card p-6 shadow-cardDrop">
          <p className="mb-4 text-sm text-content-secondary">{info}</p>
          <div className="flex justify-end gap-2">
            <Button2 name={confirmButton} changeHandler={onConfirm} />
            <Button name={cancelButton} changeHandler={onCancel} />
          </div>
        </div>
      </div>
    </>
  );
}
