import React, { useState } from "react";
import "./TweetBox.css";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import db from "../../Helpers/firebase";
import Details from "../../Helpers/Details";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";

//tweetBox component where we input our thoughts and image urls

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const data=Details();
  let likes=[]
  //adding tweet in firestore
  const sendTweet = (e) => {
    e.preventDefault();
    if(tweetMessage.length!=0||tweetImage.length!=0)
    {
    
      const payload={
        displayName: data.name,
        timestamp:serverTimestamp(),
        verified: true,
        text: tweetMessage,
        image: tweetImage,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzH6TfTtq91hzmeIvm_4JOdb5y1UWjTlYZdA&usqp=CAU",
        likes:likes
      };
      addDoc(collection(db,"posts"),payload);
      setTweetMessage("");
      setTweetImage("");
    }
    
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzH6TfTtq91hzmeIvm_4JOdb5y1UWjTlYZdA&usqp=CAU" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
            autoFocus="True"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
         <div>Tweet</div>
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
