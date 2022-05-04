import React,{forwardRef} from "react";
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import "./Comments.css"

//Comment pop up
//input userName , avatar, commentText
const Comments= forwardRef(
({userName,avatar,comment},ref)=>{

return (
    <div className="comment" ref={ref}>
    <div className="comment__avatar">
      <Avatar src={avatar} />
    </div>
    <div className="comment__body">
      <div className="comment__header">
        <div className="comment__headerText">
          <h3>
            {userName}{" "}
            <span className="comment__headerSpecial">
               <VerifiedIcon className="comment__badge" />
            </span>
          </h3>
        </div>
        <div className="comment__headerDescription">
          <p>{comment}</p>
        </div>
      </div>
    </div>
  </div> 
);
}
);

export default Comments