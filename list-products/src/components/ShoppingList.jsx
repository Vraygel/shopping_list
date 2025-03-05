import './ShoppingList.css';


function ShoppingList({ shoppingList, onDeleteItem, onEditItem }) {
		return (
				<ul className="shopping-list">
						{shoppingList.map((item, index) => (
								<li key={index} className="shopping-item">
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
