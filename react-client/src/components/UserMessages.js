function UserMessages({userMessage}){

    return (
        <div className="alert alert-warning d-flex align-items-center justify-content-center fw-bolder fs-5" role="alert">
            <div>
                {userMessage}
            </div>
        </div>

    );

}

export default UserMessages;
