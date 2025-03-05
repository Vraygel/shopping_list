import React from 'react';
function ModalContacts({
	contacts,
	contactInput,
	contactType,
	onContactChange,
	onContactTypeChange,
	onAddContact,
	onDeleteContact,
	onOpenChat,
	onCloseModal
}) {
	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close-button" onClick={onCloseModal}>
					&times;
				</span>
				<h2>Список контактов</h2>
				<div className="modal-input-container">
					<input
						type="text"
						value={contactInput}
						onChange={onContactChange}
						placeholder="Введите данные контакта"
						className="modal-input-field"
					/>
					<button className="modal-add-button" onClick={onAddContact}>
						+
					</button>
				</div>
				<div className="switch">
					<input
						checked={contactType === 'whatsapp'}
						name="check"
						id="switchBox"
						type="checkbox"
						onChange={onContactTypeChange}
					/>
					<label className="slider" htmlFor="switchBox"></label>
				</div>
				<p className="modal-info">Введите номер телефона или логин Telegram</p>
				<ul className="contact-list">
					{contacts.map((contact, index) => (
						<li
							key={index}
							className="contact-item"
							onClick={() => onOpenChat(contact)}
						>
							{contact.text} ({contact.type})
							<button
								className="contact-delete-button"
								onClick={(event) => {
									event.stopPropagation();
									onDeleteContact(index);
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
	);
}
export default ModalContacts;
