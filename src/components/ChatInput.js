import { Button } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();

    if (!channelId) {
      return false;
    }

    const messagesCollection = collection(db, `rooms/${channelId}/messages`);
    addDoc(messagesCollection, {
      message: input,
      timestamp: serverTimestamp(),
      user: 'username',
      userImage: 'https://i.pravatar.cc/300',
    });

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
          placeholder={`Message #ROOM`}
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
    border: 1px solid gray;
    border-radius: 8px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
