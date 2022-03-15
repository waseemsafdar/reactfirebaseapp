import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router' 
import { Link } from 'react-router-dom'
import { deleteProject } from '../../store/actions/projectAction'

const ProjectDetails = (props) => {
  const {auth}= props
  if (!auth.uid) return <Redirect to='/signin' /> 
  const { project } = props;
  console.log(project,'details');
  const {id} = props
  
  
  if (project) {
    const deletethisproject= (e) => {
      alert('do you want to delete this?')
      console.log('its clicked',id);
      props.deleteProject(id)
      props.history.push('/');
    }
    return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
        <span className="edit-card">
        <Link className="edit-project" pid={id} to={'/edit/'+id}> 
       
        <i class="material-icons left">edit</i>
        </Link>
         </span>
          <span className="card-title"> { project.title }</span>
          
        <p> { project.content }</p>
        
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Created by: {project.authorFirstName}</div>
          <div> Created at:{new Date(project.createdAt.seconds * 1000).toString()} 
          <span onClick={ (e)=>{deletethisproject(e)} } pid={id} className='deleteproject'><i class="material-icons left">delete</i></span>
          </div>
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
   
   const id = ownProps.match.params.id;
   const projects = state.firestore.data.projects;
  
   const project = projects ? projects[id] : null
   
   return {
     id:id,
     project: project,
     auth:state.firebase.auth
   }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id))
  }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)