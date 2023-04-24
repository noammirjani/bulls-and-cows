/**
 *A reusable component that renders a table with rows and column titles
 * @param {Array<Object>} rowsData - An array of objects containing the data for each row
 * @param {Array<String>} titles - An array of strings representing the column titles
 * @returns {JSX.Element} - A JSX element representing the table with the given data and titles
 */
function Tables({ rowsData, titles }) {
    // Map over the titles array to create an array of th elements for the column titles
    const titleRows = titles.map((title, index) => <th key={index} className="text-nowrap">{title}</th>);

    // Map over the rowsData array to create an array of tr elements for each row
    const rows = rowsData.map((data, index) => {

        // Map over the titles array to create an array of td elements for each cell in the row
        const cells = titles.map((title) => (
            <td key={title}>{data[title]}</td>
        ));
        return <tr key={index} className="fw-bolder fs-6">{cells}</tr>;
    });

    // Return the table element with the column titles in the thead element and the rows in the tbody element
    return (
        <div className="table-responsive text-center">
            <table className="table table-warning table-striped-columns table-hover table-bordered border-light">
                <thead>
                <tr>{titleRows}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default Tables;