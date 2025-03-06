import './SendButton.css'


function SendButton({ onSend }) {
	return (
		<button onClick={onSend} className="send-button">
			Поделиться
		</button>
	);
}

export default SendButton;