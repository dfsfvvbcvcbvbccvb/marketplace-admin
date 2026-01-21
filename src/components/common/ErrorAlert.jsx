function ErrorAlert(props) {
    if (props.error === '' || props.error === undefined) {
        return null
    }
        return (
            <div className="alert alert-danger" role="alert">
                <h3>Ошибка! {props.error}</h3>
            </div>
        )
}

export default ErrorAlert