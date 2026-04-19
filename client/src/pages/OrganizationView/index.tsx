import { useCreateOrganizationMutation } from "@/api/organization";
import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";
import { useState } from "react";

export default function OrganizationView() {
  const [showModal, setShowModal] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const [createOrganization] = useCreateOrganizationMutation();

  const handleCreateOrganization = async () => {
    console.log(organizationName);
    const response = await createOrganization({
      name: organizationName,
      owner: "Dew",
      id: "1",
    });
    setShowModal(false);
  };

  return (
    <div>
      <p>Organizations</p>
      <Button2
        name="Create organization"
        changeHandler={() => setShowModal(true)}
      />

      <div className="flex flex-row"></div>

      {showModal && (
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
                value={organizationName}
                type="text"
                handleChange={setOrganizationName}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded-lg px-4 py-2 text-sm text-content-secondary hover:text-content-primary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <Button2
                  name="Create"
                  changeHandler={handleCreateOrganization}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
