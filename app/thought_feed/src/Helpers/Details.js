import axios from 'axios';
import {useState,useEffect} from 'react'


//used to get username from django restAPI
const Details=()=>{

const [data,setData]=useState([]);
    useEffect(()=>{
 getData();
},[]);

const getData=()=>{
    axios.get('http://localhost:8000/thought/wel/')
    .then(res => {
        setData(res.data); 
        });
    }
   
    return data;

};
    
export default Details
       
        
   
