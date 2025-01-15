import React ,{useState} from "react";
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history =useNavigate()
    const handleSubmit =async(e)=>{
  
      e.preventDefault();
      const {name,email,password}=credentials;
      console.log(credentials)
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`,
        {
        
            headers: {
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0YzgzOWE1NDc4OTkzYmI3YTA4NGE0In0sImlhdCI6MTczMzA2NzY3NH0.jhnsZ9WkDZTAvkHVRoTprex1JuDu4iMDmTs459mxkuw',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({name,email,password})
        });
  const json=await response.json();
  console.log(json)
  if (json.success){
    //Save the authtoken and redirect
  localStorage.setItem('token',json.authtoken);
  history("/")
  props.showAlert("Account Created Successfully","success")

  }
  else{
    props.showAlert("Invalid Credentials","danger")
  }
      
  
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-2">
      <h2>Create account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input 
    type="password" 
    className="form-control" 
    id="password" 
    name="password" 
    onChange={onChange} 
    minLength={5} 
    required
  />
</div>
<div className="mb-3">
  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
  <input 
    type="password" 
    className="form-control" 
    id="cpassword" 
    name="cpassword" 
    onChange={onChange} 
    minLength={5} 
    required
  />
</div>

  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    
  )
}

export default Signup;