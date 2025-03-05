import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('shoppingList');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('contacts');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [contactInput, setContactInput] = useState('');
  const [contactType, setContactType] = useState('whatsapp'); // По умолчанию WhatsApp
  const inputRef = useRef(null);
  const draggedItem = useRef(null);
  const draggedOverItem = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleShowInput = () => {
    setShowInput(true);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue.trim() !== '') {
      setShoppingList([...shoppingList, { text: inputValue }]);
      setInputValue('');
    }
    setShowInput(false);
  };

  const deleteElement = (index) => {
    setShoppingList(shoppingList.filter((item, i) => i !== index));
  };

  const handleEditChange = (index, event) => {
    setShoppingList(
      shoppingList.map((item, i) =>
        i === index ? { ...item, text: event.target.value } : item
      )
    );
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleContactChange = (event) => {
    setContactInput(event.target.value);
  };

  const handleContactTypeChange = () => {
    setContactType(contactType === 'whatsapp' ? 'telegram' : 'whatsapp');
  };

  const handleAddContact = () => {
    if (contactInput.trim() !== '') {
      setContacts([...contacts, { text: contactInput, type: contactType }]);
      setContactInput('');
      setContactType('whatsapp');
    }
  };

  const deleteContact = (index) => {
    setContacts(contacts.filter((item, i) => i !== index));
  };

  const openChat = (contact) => {
    if (contact.type === 'telegram') {
      const telegramUsername = contact.text.startsWith('@')
        ? contact.text.substring(1)
        : contact.text;
      window.open(`https://t.me/${telegramUsername}`, '_blank');
    } else if (contact.type === 'whatsapp') {
      window.open(`https://wa.me/${contact.text}`, '_blank');
    }
  };
  
   const handleDragStart = (event, index) => {
    draggedItem.current = index;
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (event, index) => {
    draggedOverItem.current = index;
  };

  const handleDragEnd = () => {
    const shoppingListCopy = [...shoppingList];
    const draggedItemContent = shoppingListCopy.splice(draggedItem.current, 1)[0];
    shoppingListCopy.splice(draggedOverItem.current, 0, draggedItemContent);
    draggedItem.current = null;
    draggedOverItem.current = null;
    setShoppingList(shoppingListCopy);
  };

  return (
    <div className="app-container">
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
            placeholder="Добавить товар"
            className="input-field"
          />
        </div>
      )}

      <ul className="shopping-list">
        {shoppingList.map((item, index) => (
          <li
            key={index}
            className="shopping-item"
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragEnter={(event) => handleDragEnter(event, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => event.preventDefault()}
          >
            <span>{index + 1}.</span>
            <input
              type="text"
              value={item.text}
              onChange={(event) => handleEditChange(index, event)}
              className="edit-input"
            />
            <button className="delete-button" onClick={() => deleteElement(index)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <p className="local-storage-info">
        Список покупок сохраняется в памяти вашего браузера.
      </p>
      {shoppingList.length > 0 && (
        <button onClick={handleShowModal} className="send-button">
          Отправить
        </button>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Список контактов</h2>
            <div className="modal-input-container">
              <input
                type="text"
                value={contactInput}
                onChange={handleContactChange}
                placeholder="Введите данные контакта"
                className="modal-input-field"
              />
              <button className="modal-add-button" onClick={handleAddContact}>
                +
              </button>
            </div>
            <div className="switch">
              <input
                checked={contactType === 'whatsapp'}
                name="check"
                id="switchBox"
                type="checkbox"
                onChange={handleContactTypeChange}
              />
              <label className="slider" htmlFor="switchBox"></label>
            </div>
            <p className="modal-info">
              Введите номер телефона или логин Telegram
            </p>
            <ul className="contact-list">
              {contacts.map((contact, index) => (
                <li
                  key={index}
                  className="contact-item"
                  onClick={() => openChat(contact)}
                >
                  {contact.text} ({contact.type})
                  <button
                    className="contact-delete-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteContact(index);
                    }}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
            <p className="local-storage-info">
              Контакты сохраняются только в памяти вашего браузера. Они будут
              недоступны на других устройствах.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
