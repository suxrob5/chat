const ChatRoom = ({
  firestore,
  useCollectionData,
  useState,
  auth,
  firebase,
}) => {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(155);

  const [message] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (e.target[0].value !== "") {
      const { uid, displayName } = auth.currentUser;
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
      });
      setFormValue("");
    }
  };

  return (
    <>
      <div>
        {message &&
          message.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={auth} />
          ))}
      </div>

      <form onSubmit={sendMessage} className="bg-green-500">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="enter your message"
          className="px-10 border bg-gradient-to-l from-blue-500 to-green-500 text-black placeholder:text-white font-[600]"
        />

        <button
          type="submit"
          className="text-white text-3xl font-[600] bg-purple-500 border-red-500 border-2 hover:scale-90 transition-all hover:rounded-xl active:rounded-none active:scale-100"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default ChatRoom;

function ChatMessage(props) {
  const { auth } = props;
  const { text, uid, displayName } = props.message;
  // const { photoURL } = auth.currentUser;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <h1 className="text-2xl text-red-500 px-3 bg-green-500 py-3 rounded-lg mx-3">{displayName}</h1> <br />
      <p className="text-xl">{text}</p>
    </div>
  );
}
