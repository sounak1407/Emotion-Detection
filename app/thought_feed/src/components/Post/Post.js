import React, { forwardRef ,useState} from "react";
import "./Post.css";
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import CommentsDialog from "../CommentsDialog/CommentsDialog";
import LikePost from "../LikePost/LikePost"

//individual post component which will be used in Feed
const Post = forwardRef(
  ({ displayName,  verified, text, image, avatar,id }, ref) => {
  

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedIcon className="post__badge" />}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>

          {image.length!=0&&<img src={image} alt="" />}
          <div className="post__footer" >
           <LikePost
           id={id}
           avatar={avatar}
           />
          <CommentsDialog 
          id={id}
          avatar={avatar}
          
          />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
