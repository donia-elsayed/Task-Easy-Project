import { useContext } from "react";
import ChatContent from "../chatView/ChatContent";
import ChatFooter from "../chatView/ChatFooter";
import ChatTitle from "../chatView/ChatTitle";
import FriendList from "../friendsList/FriendList";
import { SecondUserContext } from "../context/secondUser";
import './Chat.scss'

const ChatView = () => {
  const { secondUserData } = useContext(SecondUserContext);
  return (
    <>
    <div className="container">
      <div className="chat-card">
        <div className="d-flex justify-content-around py-2">
          <h1 className="text-primary">Chat</h1>
          <form className="d-flex pt-2 pb-4">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-info text-white" type="submit">Search</button>
          </form>
        </div>
          <div className="row justify-content-around">
            <div className="col-4">
              <div className="FriendList text-info">
                <FriendList />
              </div>
            </div>
            <div className="col-5 px-4">
              <div className="chat-area">
                {secondUserData ? (
                  <>
                    <ChatTitle />
                    <ChatContent />
                    <ChatFooter />
                  </>
                ) : (
                  <div className="welcome-msg">Welcome In Our Chat</div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default ChatView;
