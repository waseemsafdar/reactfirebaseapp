import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authactions'
import { useState } from 'react'
 
const SignUp = (props)=>{
 

  const [userdata, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const handleChange = (e) => {
    setState({
      ...userdata,[e.target.id]: e.target.value
     })
    console.log(userdata);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp(userdata)
    
  }
  const { auth ,authError} = props
  console.log(authError,'sss')
  if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={ (e)=> {handleSubmit(e)}}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input required type="email" id='email' onChange={ (e)=>{handleChange(e)} } />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={ (e)=>{handleChange(e)} } />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={ (e)=>{handleChange(e)} } />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' onChange={ (e)=>{handleChange(e)} } />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
          <div className="red-text center">
          {authError}
          </div>
        </form>
      </div>
    )
  }


const mapStateToProps= ( state ) => {
  return {
    auth:state.firebase.auth,
    authError: state.auth.authError,
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    signUp: (userdata) => {dispatch(signUp(userdata))}
  }
  }

 
export default connect (mapStateToProps,mapDispatchToProps) (SignUp)