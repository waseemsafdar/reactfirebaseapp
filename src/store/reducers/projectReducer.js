const initState = {
    
  }
  
  const projectReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_PROJECT':
        console.log('create project1', action.project);
        return state;
        
      case 'CREATE_PROJECT_ERROR':
       console.log('create project error', action.project);
       return state;
       default: 
       return state;

    }
   
  };
  
  export default projectReducer;
