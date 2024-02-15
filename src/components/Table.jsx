import * as Icons from 'react-feather';

export function Table(props) {
    const ACTIONS = {
        EDIT: 'edit',
        READ: 'read',
        DELETE: 'delete'
    };
    const {tableAttributes, tableData, tableActions, controllers} = props;
    const {handleEditClick, handleReadClick, handleDeleteClick} = controllers;
        
    const renderReadButton = data => (
        <button className="btn btn-sm btn-danger" 
        onClick={e => handleReadClick(e, data)} key={Math.random()}> 
            <Icons.Eye className="w-"/> 
        </button>
        );

    const renderEditButton = data => (
        <button className="btn btn-sm btn-info mr-3" 
        onClick={e => handleEditClick(e, data)} key={Math.random()}> 
            <Icons.Edit className="w-"/> 
        </button>
        );

    const renderDeleteButton = data => (
        <button className="btn btn-sm btn-danger" 
        onClick={e => handleDeleteClick(e, data)} key={Math.random()}> 
            <Icons.Trash2 className="-1"/> 
        </button>
        );

    const renderTableHeads = () => {
        const tableHeads = Object.keys(tableAttributes)
        .map((key, index) => {
            const regEx = new RegExp('[-_]', 'gi');
            return (
                <th className={`${tableAttributes[key].thClassName ?? ""} 
                whitespace-no-wrap`}
                key={index}>
                    {key.replace(regEx, ' ').toUpperCase()}
                </th>
            )
        })

        tableHeads.push(<th key={9999} className="text-center 
        whitespace-no-wrap">ACTIONS</th>);

        return tableHeads;
    }

    const renderTableCell = (data, attribute, index) => {
        return (<td className={tableAttributes[attribute].tdClassName ?? ""} 
            key={index}>{data}
            </td>
        )
    }

    const renderTableActionCell = data => {
        return (
            <td className="table-report__action w-56" key={Math.random()}>
                {tableActions.map((action) => {
                    switch (action) {
                        case ACTIONS.EDIT:
                            return renderEditButton(data);
                        case ACTIONS.READ:
                            return renderReadButton(data);
                        case ACTIONS.DELETE:
                            return renderDeleteButton(data);
                        default:
                            return null;
                    }
                })}
            </td>
        )

    }

    const renderTableRow = (rowData, index) => {
        const tableCells = Object.keys(rowData).map((key, i) => {
                if (key in tableAttributes === false) return null;

                return renderTableCell(rowData[key], key, i);
            });

        tableCells.push(renderTableActionCell(rowData))

        return (<tr key={index} className="intro-x">{tableCells}</tr>)
    }
        

    return (
        <div className="card mt-3">
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>{renderTableHeads()}</tr>
                    </thead>
                    <tbody>
                        {tableData.map((rowData, index) => renderTableRow(rowData, index))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}