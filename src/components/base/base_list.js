import ListItem from './base_list_item';

const List = ({list}) => {
  return (
    list.length > 0 && (
      <ul className='p-0 m-0'>
        {list.map(item => <ListItem item={item} isBorder={true}/>)}
      </ul>
    )
  );
};

export default List;