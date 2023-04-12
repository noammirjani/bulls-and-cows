
function UserMessages({userMessage, variant}) {
    const className = `alert alert-${variant} d-flex align-items-center justify-content-center fw-bolder fs-5`;
    return (
        <div className={className} role="alert">
            <div>{userMessage}</div>
        </div>
    );
}


export default UserMessages;
