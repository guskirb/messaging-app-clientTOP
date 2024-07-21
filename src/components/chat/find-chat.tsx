export default function FindChat({ auth, setShowModal }) {
  return (
    <div className="no-chats__container">
      <div className="no-chat-message__container">
        <img src={auth.user.image} alt="" className="no-chat-img" />
        <h2>Welcome, {auth.user.username}!</h2>
        <p>Create a chat to start messaging.</p>
      </div>
      <button onClick={() => setShowModal(true)}>Create Chat</button>
    </div>
  );
}
