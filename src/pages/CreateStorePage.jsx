import StoreForm from "../components/StoreForm"

function CreateStorePage() {
    return (
                <StoreForm
                    submitLabel="Create Store"
                    isEditing={false}
                />
    )
}

export default CreateStorePage