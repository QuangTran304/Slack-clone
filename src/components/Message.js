import styled from 'styled-components';

const Message = ({ message, timestamp, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt='user avatar' />
      <MessageInfo>
        <h4>
          {user}{' '}
          <span>
            {new Date(timestamp?.toDate()).toLocaleTimeString('en-US')}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
    border: 1px solid lightgray;
    margin-right: 5px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 10px;
    font-size: 11px;
  }
`;
