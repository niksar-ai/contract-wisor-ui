const ListItem = ({item, isBorder }) => {
  const handleClick = () => item.onClick ? item.onClick(item) : null;
  return (
    <li className={`position-relative d-flex justify-content-between align-items-center ${isBorder && 'border-bottom'} stretched-link px-3 py-1 m-2`} onClick={handleClick}>
      <div className='d-flex align-items-center'>
        <div className="me-3">{item.leading}</div>
        <div className='flex-1 '>
          <div className="fw-bold">{item.title}</div>
          <small className="text-muted">{item.subTitle}</small>
        </div>
      </div>
      <div className='text-end'>{item.traling}</div>
    </li>
  );
};

export default ListItem;