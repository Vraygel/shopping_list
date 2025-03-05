import React, { useState } from 'react';
import HelpModal from './HelpModal';
import './HelpButton.css'

function HelpButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="help-container"> {/*Удален*/}
			<button
				className="help-button"
				onClick={handleOpenModal}
				title="Как работать с приложением"
			>
				?
			</button>
			<HelpModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
}

export default HelpButton;
