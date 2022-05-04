import React,{useState} from "react";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot  } from "firebase/firestore";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Detail from "../../Helpers/Details";
import db from "../../Helpers/firebase";
import './CommentInputBox.css'

//Text field to input comments

const CommentInputBox=({id})=>{
    
    const [userComment,setUserComment]=useState("");
    const username=Detail().name;

    const addComment=(e)=>{
        e.preventDefault();
        if(userComment.length!=0){
            const colref=collection(db,"posts/"+id+"/comments");
            const payload={
            comment:userComment,
            timestamp:serverTimestamp(),
            user:username
        }
        addDoc(colref,payload)

        setUserComment("");
        }
        
    }
   
    
    return(
        <div className="comment_input">
                <textarea
                    cols="70"               
                    onChange={(e) => setUserComment(e.target.value)}
                    value={userComment}
                    placeholder="Add comment.."
                    type="text"
                    autoFocus="True"
                />
                <button onClick={addComment}>
                    <AddCommentIcon />
                </button>
            </div>
    );
}

export default CommentInputBox