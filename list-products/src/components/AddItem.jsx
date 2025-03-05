import { useState, useRef, useEffect } from 'react';
import './AddItem.css';

function AddItem({ onAddItem }) {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef(null);
	const [showInput, setShowInput] = useState(false);

	useEffect(() => {
		if (showInput && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showInput]);
		const handleShowInput = () => {
				setShowInput(true);
				setInputValue('');
		};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleInputBlur = () => {
			addItem()
			setShowInput(false);
	};

		const handleKeyDown = (event) => {
				if (event.key === 'Enter') {
						addItem();
				}
		};
		const addItem = () => {
				if (inputValue.trim() !== '') {
						onAddItem(inputValue);
						setInputValue('');
				}
		};
	return (
		<div>
			<button onClick={handleShowInput} className="add-new-button">
				Новый элемент
			</button>
			{showInput && (
				<div className="input-container">
					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onBlur={handleInputBlur}
						onKeyDown={handleKeyDown}
						placeholder="Добавить товар"
						className="input-field"
					/>
				</div>
			)}
		</div>
	);
}

export default AddItem;
