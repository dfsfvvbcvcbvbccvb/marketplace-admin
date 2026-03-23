import UserForm from "../components/UserForm"
function CreateUserPage() {

    return (
        <UserForm
            submitLabel='Create user'
            isEditing={false}
        />
    )
}
export default CreateUserPage
