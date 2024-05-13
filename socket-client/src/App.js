import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState('');
  const [received, setReceived] = useState('');

  useEffect(() => {
    socket.on("receive_message", data => {
      console.log({ data })
      setReceived(data?.message);
    })
  }, [socket]);

  const handleChange = e => setMessage(e?.target?.value);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage('');
  }

  return (
    <div className="app">
      <input
        plassholder='Type here...'
        value={message}
        onChange={handleChange} />
      <button onClick={sendMessage}>Send Message</button>
      <hr />
      <div>
        {received}
      </div>
    </div>
  );
}

export default App;
