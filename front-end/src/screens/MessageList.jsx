import React from "react";
import MessagePreview from "../components/MessagePreview";

export default function MessageList() {
    return (
      <div>
        {/* <div>Header</div> */}
        <div className="chat_list_body">
          <MessagePreview preview={"Hello, my name is yewon"} name={"Yewon Song"} img={"https://picsum.photos/50/50"}/>
        </div>
        {/* <div>Navigation Bar</div> */}
      </div>
    );
  }
