import CategoryForm from "../components/CategoryForm"
function CreateCategoryPage() {

    return (
        <CategoryForm
            submitLabel='Create category'
            isEditing={false}
        />
    )
}
export default CreateCategoryPage
