// isLoggedIn -> if data is present in internal storage then user is logged in
export const isLoggedIn = ()=>{
    let data = localStorage.getItem("data");
    if(data!=null) return true;
    else return false;
}

//doLogin -> set data to local storage
export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next() // called after login
}

//doLogout -> remove from local storage
export const doLogout = (next)=>{
    localStorage.removeItem("data");
    next() //called after logout
}

//get current user who is logged in
export const getCurrentUserDetail = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user; //we have retrieved string so we are parsing and converting it into object. 
    }                                                           //only user will be returned not the token
    else{
        return undefined;
    }
}

//get token
export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token;
    }else{
      return null;
    }
  }