import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { editProject } from '../../store/actions/projectAction'
import React, { useEffect, useState } from 'react';
import { compose } from 'redux'
import { Redirect } from 'react-router'


 const EditProject = (props) => {
     
   
    const { project } = props

    const { docid } = props
    const {updatemessage}= props
    console.log(updatemessage,'message')
    var tt =''
    var cc =''
    if(project){
         tt = project.title
         cc = project.content
    }
    
    console.log(tt,'chcking time')
    const  [state, setstate] = useState( {title:tt,
    content:cc, docid:docid})
    useEffect(() => {
        
        setstate({...state,'title': tt,'content':cc })
        
    }, [tt])
    if (!props.auth.uid )  return <Redirect to='/signin' />
    
    const handleChange = (e) => {
        setstate({...state,[e.target.id]: e.target.value})
      
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state,'after submit');
       props.editProject(state);
        
       props.history.push('/');
        
    }
 
  if(project){
    return (
      <div className="container">
        <form className="white" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Edit Project</h5>
          <div className="input-field">
            <input type="text" id='title'  value={state.title}  onChange={handleChange} />
            <label htmlFor="title">Project Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" value={state.content}  className="materialize-textarea" onChange={handleChange}></textarea>
            <label htmlFor="content">Project Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Update</button>
          </div>
          <div className="red-text center">
          {updatemessage}
          </div>
        </form>
      </div>
    )
    }
    else {
        return (
          <div className="container center">
            <p>Loading project...</p>
          </div>
        )
    }
}
const mapStateToProps = (state,ownProps)=> {
    console.log('here state',state)
const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null    
    return {
        docid:id,
        auth:state.firebase.auth,
        project:project,
        updatemessage:state.project.updatemessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      editProject: (project) => dispatch(editProject(project))
    }
  }


  export default compose(
    firestoreConnect([
        { collection: 'projects' }
      ]),
      
    connect(mapStateToProps,mapDispatchToProps)
    
  )(EditProject)