import React ,{useState, useEffect} from "react";
import "./CommentsDialog.css";
import db from "../../Helpers/firebase";
import {  collection,  query, orderBy, onSnapshot  } from "firebase/firestore";
import CommentInputBox from "../CommentInputBox/CommentInputBox";
import Comments from "../Comments/Comments";
import FlipMove from "react-flip-move";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const CommentsDialog=({id,avatar})=>{
    const [commentsection,setCommentSection]=useState([]);
    const [isOpen,setOpen]=useState(()=>false);
    
    //called once before loading
    useEffect(() => {
        const colref=collection(db,"posts/"+id+"/comments");
        const q=query(colref,orderBy("timestamp","desc"));
        const unsub=onSnapshot(q,(snapshot) =>
        setCommentSection(snapshot.docs.map((doc) => doc.data())));
            return unsub;
      }, []);
    

    const toggle=()=>{
        setOpen(!isOpen);
    }

return (
    <>
    <button className="commentsbutton" onClick={toggle}>
    <span><ChatBubbleOutlineOutlinedIcon fontSize="small" />
    <p>comment</p></span>
    </button>
    {isOpen&&
    <div className="popUp">
        <div onClick={toggle} className="overlay"></div>
        <div className="popUp-inner">
           <FlipMove >
            {
                    commentsection.map((comment)=>(
                       <Comments key={comment.timestamp}
                       avatar={avatar}
                       userName={comment.user}
                       comment={comment.comment}
                       />
                    ))
                
                    }
                </FlipMove>  
              
            <CommentInputBox id={id}/>
        </div>
    </div>}
    
    </>
);
}
export default CommentsDialog