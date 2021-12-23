const initState = {
    authError:null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        console.log('login sunceess');
        return {
            ...state,
            authError:'Login Success'
        }
        
      case 'LOGIN_ERROR':
       return {
           ...state,
           authError:'Login error'
       }
       case 'LOGOUT_SUCCESS' :
        console.log('logout success')
       return {
        state
       }
       case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return state;
  
      case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return {
          ...state,
          authError: null
        }
  
      case 'SIGNUP_ERROR':
        console.log('signup errossr',action.err.message)
        return {
          ...state,
          authError: action.err.message
        }
       
       default: 
       return state;

    }
   
  };
  
  export default authReducer;
