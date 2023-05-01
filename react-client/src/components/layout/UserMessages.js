/**
 * UserMessages component displays a user message in an alert box. It receives the message text and the variant
 * (color) of the alert box.
 *
 * @param {string} userMessage - The message text to display in the alert box.
 * @param {string} variant - The variant (color) of the alert box. Possible values: "primary", "secondary", "success",
 * "danger", "warning", "info", "light", "dark".
 * @returns a JSX element containing an alert box displaying the user message.
 */
function UserMessages({userMessage, variant}) {
    const className = `alert alert-${variant} d-flex align-items-center justify-content-center fw-bolder fs-5`;
    return (
        <div className={className} role="alert">
            <div>{userMessage}</div>
        </div>
    );
}


export default UserMessages;
