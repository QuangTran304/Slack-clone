import { Button } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  console.log(user);
  const sendMessage = (event) => {
    event.preventDefault();

    if (!channelId) {
      return false;
    }

    const messagesCollection = collection(db, `rooms/${channelId}/messages`);
    addDoc(messagesCollection, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    // When sending the message, scroll into view (of latest message)
    chatRef.current.scrollIntoView({ behavior: 'smooth' });

    // After sending a message, clear the input
    setInput('');
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder={`Message to #${channelName}`}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    height: 25px;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 20px;
    outline: none;
    box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.12);

    &:hover {
      box-shadow: 0px 2px 18px 10px rgba(0, 0, 0, 0.12);
    }
  }

  > form > button {
    display: none !important;
  }
`;
