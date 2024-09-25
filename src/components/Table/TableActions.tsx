const TableActions = ({actions}: {actions: JSX.Element[]}) => {
    return <div className='d-flex align-items-center permissions-actions'>
          {actions}
        </div>
}

export default TableActions;