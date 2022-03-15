export const createProject = (project) => {
    return (dispatch, getState,{ getFirebase,getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').add({
        ...project,
        authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
      }).then(()=> {
              dispatch({ type: 'CREATE_PROJECT', project });
      }).catch( (err)=> {
              dispatch({ type: 'CREATE_PROJECT_ERROR', err });
      })
      
    }
  };

  export const editProject = (project) => {
      console.log(project,'here in action')
    return (dispatch, getState,{getFirebase,getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const docRef = firestore.collection('projects').doc(project.docid)
    docRef
    .update({
      title: project.title,
      content:project.content
    }).then(()=> {
              dispatch({ type: 'UPDATE_PROJECT', project });
      }).catch( (err)=> {
              dispatch({ type: 'UPDATE_PROJECT_ERROR', err });
      })
      
    }
  };

  
  export const deleteProject = (docid) => {
    console.log(docid,'here in deleteaction')
  return (dispatch, getState,{getFirebase,getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  const docRef = firestore.collection('projects').doc(docid)
  docRef.delete().then(()=> {
            dispatch({ type: 'DELETE_PROJECT', docid });
    }).catch( (err)=> {
            dispatch({ type: 'DELETE_PROJECT_ERROR', err });
    })
    
  }
};