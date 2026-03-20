import CategoryForm from "./CategoryForm"
function CreateCategoryPage() {

    return (
        <CategoryForm
            submitLabel='Create category'
            isEditing={false}
        />
    )
}
export default CreateCategoryPage