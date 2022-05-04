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
    <button className="commentsbutton" data-toggle="modal" data-target="#myModal">
    <span><ChatBubbleOutlineOutlinedIcon fontSize="small" />
    <p>comment</p></span>
    </button>


    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Launch demo modal
    </button> */}
  
  {/* <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> */}
  {/* {isOpen&& */}

  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-dialog-scrollable">
    
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Comments</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          {/* <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> */}
          <CommentInputBox id={id}/>
        </div>
      </div>
      
    </div>
  </div>
  
   {/* } */}
   
    {/* {isOpen&&

    
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
    </div>
    
    
    } */}
   
    
    </>
);
}
export default CommentsDialog