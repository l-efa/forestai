import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";

type CreateOrganizationType = {
  name: string;
  handleNameChange: (next: string) => void;
  handleCreateOrganization: () => void;
  setShowModal: (next: boolean) => void;
};

export default function CreateOrganizationModal({
  name,
  handleNameChange,
  handleCreateOrganization,
  setShowModal,
}: CreateOrganizationType) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={() => setShowModal(false)}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-surface-border bg-surface-card p-6 shadow-cardDrop">
          <h2 className="mb-4 text-lg font-bold">Create Organization</h2>
          <InputField
            name="Name"
            value={name}
            type="text"
            handleChange={handleNameChange}
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded-lg px-4 py-2 text-sm text-content-secondary hover:text-content-primary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <Button2 name="Create" changeHandler={handleCreateOrganization} />
          </div>
        </div>
      </div>
    </>
  );
}
