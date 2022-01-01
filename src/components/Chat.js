import styled from 'styled-components';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';

const Chat = () => {
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(roomId && doc(db, `rooms/${roomId}`));

  const messagesCollection = collection(db, `rooms/${roomId}/messages`);
  const [roomMessages] = useCollection(
    roomId && query(messagesCollection, orderBy('timestamp', 'desc'))
  );

  const renderMessages = () => {
    if (!roomMessages) {
      return null;
    }

    return roomMessages.docs.map((doc) => {
      const { message, timestamp, user, userImage } = doc.data();

      return (
        <Message
          key={doc.id}
          message={message}
          timestamp={timestamp}
          user={user}
          userImage={userImage}
        />
      );
    });
  };

  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>#{roomDetails?.data().name}</strong>
          </h4>
          <StarOutlineIcon />
        </HeaderLeft>

        <HeaderRight>
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </HeaderRight>
      </Header>

      <ChatMessages>{renderMessages()}</ChatMessages>

      <ChatInput channelName={roomDetails?.data().name} channelId={roomId} />
    </ChatContainer>
  );
};

export default Chat;

const ChatMessages = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
