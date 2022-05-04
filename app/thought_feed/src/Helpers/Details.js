
import Cookies from 'js-cookie';
//used to get username from django restAPI
const Details=()=>{

    return JSON.parse(Cookies.get('uname').split('\\').join(''));
};
    
export default Details
       
        
   
