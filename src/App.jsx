import { useState, useEffect, useRef } from "react";
import "./App.css";
import SubmitForm from "./SubmitForm/SubmitForm.jsx";
import LoadMessages from "./LoadMessages/LoadMessages";

function App() {
  const [messages, setMessages] = useState();
  const fetchState = useRef(true);

  useEffect(() => {
    if (fetchState.current) {
      fetchState.current = false;
      fetch("https://marcus-chat-server.glitch.me/messages/latest")
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          fetchState.current = true;
        })
        .catch((error) => {
          console.error("There was an error fetching messages", error);
          fetchState.current = true;
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date().toLocaleTimeString();
    const formData = Object.fromEntries(new FormData(e.target));
    const timeAndData = { ...formData, timeSent: currentTime };

    const response = await fetch(
      "https://marcus-chat-server.glitch.me/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeAndData),
      }
    );

    if (response.ok) {
      const fetchLatest = await fetch(
        "https://marcus-chat-server.glitch.me/messages/latest"
      );
      const data = await fetchLatest.json();
      setMessages(data);
      e.target.reset();
    } else {
      console.error("Failed to send message");
    }
  };

  const handleDeleted = async () => {
    const latestMessages = await fetch(
      "https://marcus-chat-server.glitch.me/messages/latest"
    );
    const data = await latestMessages.json();
    setMessages(data);
  };

  return (
    <>
      <SubmitForm handleSubmit={handleSubmit} />
      <LoadMessages messageData={messages} updateMessages={handleDeleted} />
    </>
  );
}

export default App;
