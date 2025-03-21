import { useState, useRef, useEffect } from 'react';
import './App.css';
import AddItem from './components/AddItem';
import ShoppingList from './components/ShoppingList';
import SendButton from './components/SendButton';
import ModalContacts from './components/ModalContacts';
import HelpButton from './components/HelpButton';

function App() {
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
  const draggedItem = useRef(null);
  const draggedOverItem = useRef(null);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddItem = (inputValue) => {
    setShoppingList([...shoppingList, { text: inputValue, checked: false }]); // Добавлено
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
    const message = shoppingList.map((item) => `• ${item.text}`).join('%0A');

    if (contact.type === 'telegram') {
      const telegramUsername = contact.text.startsWith('@')
        ? contact.text.substring(1)
        : contact.text;
      window.open(`https://t.me/${telegramUsername}?text=${message}`, '_blank');
    } else if (contact.type === 'whatsapp') {
      window.open(`https://wa.me/${contact.text}?text=${message}`, '_blank');
    }
    handleCloseModal();
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

  const handleClearList = () => {
    setShoppingList([]);
    localStorage.removeItem('shoppingList');
  };

  const handleCheckboxChange = (index, event) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, checked: event.target.checked } : item
    );

    const checkedItem = updatedList[index]; // Получаем элемент, который был изменен
    const filteredList = updatedList.filter((item,i)=> i!== index); // Фильтруем элемент, который был изменен
    if (checkedItem.checked){ // Если элемент отмечен, то добавляем его в конец
        setShoppingList([...filteredList, checkedItem]);
    } else{ // Если не отмечен, то добавляем его в массив на то же место.
        setShoppingList(updatedList)
    }
  };

  return (
    <div className="app-container">
      <div className="app-buttons-container">
        <button className="clear-list-button" onClick={handleClearList}>
          Удалить список
        </button>
        <HelpButton />
      </div>
      <AddItem onAddItem={handleAddItem} />
      <ShoppingList
        shoppingList={shoppingList}
        onDeleteItem={deleteElement}
        onEditItem={handleEditChange}
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        handleDragEnd={handleDragEnd}
        onCheckboxChange={handleCheckboxChange} // Добавлено
      />
      <p className="local-storage-info">
        Список покупок сохраняется только в памяти вашего браузера. Он будет недоступен на другом устройстве.
      </p>
      {shoppingList.length > 0 && <SendButton onSend={handleShowModal} />}
      {showModal && (
        <ModalContacts
          contacts={contacts}
          contactInput={contactInput}
          contactType={contactType}
          onContactChange={handleContactChange}
          onContactTypeChange={handleContactTypeChange}
          onAddContact={handleAddContact}
          onDeleteContact={deleteContact}
          onOpenChat={openChat}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
