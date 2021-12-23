import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router' 

const ProjectDetails = (props) => {
  const {auth}= props
  if (!auth.uid) return <Redirect to='/signin' /> 
  const { project } = props;
  console.log(project,'details');
  console.log(props.match);
  
  if (project) {
    return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title"> { project.title }</span>
        <p> { project.content }</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Created by: {project.authorFirstName}</div>
          <div> Created at:{new Date(project.createdAt.seconds * 1000).toString()} </div>
        </div>
      </div>
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
const mapStateToProps = (state,ownProps) => {
    console.log(state);
   const id = ownProps.match.params.id;
   const projects = state.firestore.data.projects;
   const project = projects ? projects[id] : null
   
   return {
     project: project,
     auth:state.firebase.auth
   }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)