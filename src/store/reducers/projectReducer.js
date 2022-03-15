const initState = {
    
  }
  
  const projectReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_PROJECT':
        console.log('created', action);
        return state;

        case 'DELETE_PROJECT':
          console.log('Deleted', action);
          return {...state,
            deletemessage:'deleted successfully'};

            case 'DELETE_PROJECT_ERROR':
              console.log('Error', action.docid);
              return {...state,
                deletemessage:'Error'};
        case 'UPDATE_PROJECT':
          
          return {...state,
            updatemessage:'updated successfully'};

          case 'UPDATE_PROJECT_ERROR':
           
            return {...state,
              updatemessage:'Error in update'};
           
      case 'CREATE_PROJECT_ERROR':
       console.log('create project error', action.project);
       return {...state,
        updatemessage:'error in update'};
       default: 
       return state;

    }
   
  };
  
  export default projectReducer;
