import UserForm from "./UserForm"
function CreateUserPage() {

    return (
        <UserForm
            submitLabel='Create user'
            isEditing={false}
        />
    )
}
export default CreateUserPage