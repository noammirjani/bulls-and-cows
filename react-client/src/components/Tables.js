function Tables({ rowsData, titles }) {
    const titleRows = titles.map((title, index) => <th key={index} className="text-nowrap">{title}</th>);


    const rows = rowsData.map((data, index) => {
        const cells = titles.map((title) => (
            <td key={title}>{data[title]}</td>
        ));
        return <tr key={index} className="fw-bolder fs-6">{cells}</tr>;
    });


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
