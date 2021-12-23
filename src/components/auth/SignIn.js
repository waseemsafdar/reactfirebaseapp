import React from 'react'
import { connect } from 'react-redux'
import {signIn} from '../../store/actions/authactions'
import  { useState } from 'react';
import { Redirect } from 'react-router'
const SignIn = (props)=> {


  const [creds, setState] = useState({email:'',password:''});
  const {autherror}=props
  const handleChange = (e) => {
    
    setState({
     ...creds,[e.target.id]: e.target.value
    })
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(creds)
  }
  const { auth } = props
if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={ (e)=> {handleSubmit(e)}}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={ (e)=>{handleChange(e)} } />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={ (e)=>{handleChange(e)} }/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
          <div className="red-text center">
          {autherror}
          </div>
        </form>
      </div>
    )
  
    
}

const mapStateToProps= ( state ) => {
  return {
    autherror: state.auth.authError,
    auth:state.firebase.auth
  }
}

const mapDispatchToProps= (dispatch) => {
return {
  signIn: (creds) => {dispatch(signIn(creds))}
}
}
 
export default connect (mapStateToProps,mapDispatchToProps) (SignIn)