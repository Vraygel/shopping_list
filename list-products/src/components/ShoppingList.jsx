import './ShoppingList.css';

function ShoppingList({
  shoppingList,
  onDeleteItem,
  onEditItem,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
  onCheckboxChange,
}) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <ul className="shopping-list" onDragOver={handleDragOver}>
      {shoppingList.map((item, index) => (
        <li
          key={index}
          className={`shopping-item ${item.checked ? 'completed' : ''}`} // Добавлено
          draggable="true"
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnter={(event) => handleDragEnter(event, index)}
          onDragEnd={handleDragEnd}
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(event) => onCheckboxChange(index, event)}
            className="checkbox"
          />
          <span>{index + 1}.</span>
          <input
            type="text"
            value={item.text}
            onChange={(event) => onEditItem(index, event)}
            className={`edit-input ${item.checked ? 'completed' : ''}`} // Добавлено
          />
          <button className="delete-button" onClick={() => onDeleteItem(index)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ShoppingList;
