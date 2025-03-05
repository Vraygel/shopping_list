import './ShoppingList.css';

function ShoppingList({
  shoppingList,
  onDeleteItem,
  onEditItem,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}) {
  const handleDragOver = (event) => { // Добавлено
    event.preventDefault();
  };
  return (
    <ul className="shopping-list" onDragOver={handleDragOver}> {/* Добавлено */}
      {shoppingList.map((item, index) => (
        <li
          key={index}
          className="shopping-item"
          draggable="true"
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnter={(event) => handleDragEnter(event, index)}
          onDragEnd={handleDragEnd}
        >
          <span>{index + 1}.</span>
          <input
            type="text"
            value={item.text}
            onChange={(event) => onEditItem(index, event)}
            className="edit-input"
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
