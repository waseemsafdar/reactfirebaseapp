import { connect} from 'react-redux'
import { createProject } from '../../store/actions/projectAction'
import React, { useState } from 'react';

import { Redirect } from 'react-router'

 const CreateProject = (props) => {
   
   const [state, setstate] = useState( {title:'',
   content:''})
   
  const handleChange = (e) => {
    console.log(state)
    //console.log(e.target.value,e.target.id)
   
    setstate({...state,[e.target.id]: e.target.value})
   
    console.log(state)
  }
  const handleSubmit = (e) => {
   console.log('in')
    e.preventDefault();
     console.log(state);
    props.createProject(state);
    props.history.push('/');
     
  }
  if (!props.auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">
        <form className="white" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={handleChange} />
            <label htmlFor="title">Project Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={handleChange}></textarea>
            <label htmlFor="content">Project Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
      </div>
    )
}
const mapStateToProps = (state)=> {
return{
  auth:state.firebase.auth
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)