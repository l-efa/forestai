import { useCreateOrganizationMutation } from "@/api/organization";
import Button2 from "@/components/Button2";
import { useState } from "react";
import CreateOrganizationModal from "./CreateOrganizationModal";
import OwnedOrganizations from "./OwnedOrganizations";

export default function OrganizationView() {
  const [showModal, setShowModal] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const [createOrganization] = useCreateOrganizationMutation();

  const handleCreateOrganization = async () => {
    console.log(organizationName);
    const response = await createOrganization({
      name: organizationName,
    });
    setShowModal(false);
  };

  return (
    <div className="p-2">
      <p>Organizations</p>
      <Button2
        name="Create organization"
        changeHandler={() => setShowModal(true)}
        className="rounded-none"
      />

      <div className="flex flex-row"></div>

      {showModal && (
        <CreateOrganizationModal
          name={organizationName}
          handleNameChange={setOrganizationName}
          handleCreateOrganization={handleCreateOrganization}
          setShowModal={setShowModal}
        />
      )}

      <OwnedOrganizations />
    </div>
  );
}
