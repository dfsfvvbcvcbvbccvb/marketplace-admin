import StoreForm from "./StoreForm"

function CreateStorePage() {
    return (
                <StoreForm
                    submitLabel="Create Store"
                    isEditing={false}
                />
    )
}

export default CreateStorePage