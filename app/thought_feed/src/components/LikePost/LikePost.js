import React, { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"; 
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import db from "../../Helpers/firebase";
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import "./LikePost.css"
import Details from "../../Helpers/Details";
const LikePost=({id,avatar})=>{
    const [numLikes,setLikes]=useState(0);
    const [isLiked,toggleLike]=useState(false);
    const [usersArray,setUsersArray]=useState([]);
    const [isOpen,setOpen]=useState(()=>false);
    const [username,setUsername]=useState();
    
    //for getting users who liked from firebase
    //called only once before loading
    useEffect(() => {
        setUsername(Details().name);
        const docRef=doc(db,"posts",id);
        const snap=onSnapshot(docRef,(ss)=>{
            setUsersArray(ss.data().likes);
            setLikes(ss.data().likes.length);
            
        });
        return snap;
      }, []);
      //getting name from django using  RESTAPI 
      //called once before loading
    
    //toggling liked post after getting username
    //called everytime username or usersArray
    useEffect(()=>{
        toggleLike(usersArray.includes(username));
    },[username,usersArray]);


    
    const addLike=()=>{
        const docRef = doc(db, 'posts', id);
        setDoc(docRef, { likes: arrayUnion(username) }, { merge: true });
        toggleLike(true);
    }
    const removeLike=()=>{
        const docRef = doc(db, 'posts', id);
        setDoc(docRef, { likes: arrayRemove(username) }, { merge: true });
        toggleLike(false);
    }
    const toggle=()=>{
        setOpen(!isOpen);
    }

    return(<span >

       {isLiked&&<button onClick={removeLike} className="likebutton"><FavoriteIcon fontSize="small" /></button>}
       {!isLiked&&<button onClick={addLike} className="likebutton"><FavoriteBorderOutlinedIcon fontSize="small" /></button>}
       
       <p><button onClick={toggle} className="likebutton">{numLikes}{" "}Like</button></p>
         {isOpen&&<div className="popUp">
        <div onClick={toggle} className="overlay"></div>
        <div className="popUp-inner">
            {
                usersArray.map((user)=>(
                    <div className="user" key={user}>
                        <div className="comment__avatar">
                            <Avatar src={avatar} />
                        </div>
                        <div className="user__body">
                            <div className="user__header">
                                <div className="user__headerText">
                                    <h3>
                                        {user}{" "}
                                        <span className="user__headerSpecial">
                                            <VerifiedIcon className="user__badge" />
                                        </span>
                                    </h3>

                                </div>

                            </div>

                        </div>
                    </div>
                ))
            }              
        </div>
    </div>}
         
         
    </span>);
}
export default LikePost