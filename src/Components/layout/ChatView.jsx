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
      <div className="chat-card pt-3 mx-auto">
        <div className="row justify-content-around bg-light pb-4">
          <div className="d-flex align-items-baseline pt-2 mx-5">
            <h3 className="text-info ms-3">Chat</h3>
              <form className="d-flex pt-1 pb-3 w-50 ms-5">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-info text-white ms-1" type="submit">Search</button>
              </form>
          </div>
          <div className="col-lg-5 col-md-12  friend__card mb-5">
            <div className="FriendList text-info mx-4">
              <FriendList />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 px-0">
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
