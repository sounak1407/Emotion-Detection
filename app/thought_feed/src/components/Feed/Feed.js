import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Post from "../Post/Post";
import "./Feed.css";
import db from "../../Helpers/firebase";
import FlipMove from "react-flip-move";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

//feed component where all post will show up
function Feed() {
  const [posts, setPosts] = useState([]);

  //called once before loading
  useEffect(() => {
    const colref=collection(db,"posts");
    const q=query(colref,orderBy("timestamp","desc"));
    const unsub=onSnapshot(q,(snapshot) =>
    setPosts(snapshot.docs));
    return unsub;
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Thought feed</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.data().displayName}
            verified={post.data().verified}
            text={post.data().text}
            avatar={post.data().avatar}
            image={post.data().image}
            id={post.id}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;