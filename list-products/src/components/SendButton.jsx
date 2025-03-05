import './SendButton.css'


function SendButton({ onSend }) {
	return (
		<button onClick={onSend} className="send-button">
			Отправить
		</button>
	);
}

export default SendButton;
