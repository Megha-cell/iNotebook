import React ,{useState} from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  let history =useNavigate()
  const handleSubmit =async(e)=>{

    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login',
      {
          headers: {
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0YzgzOWE1NDc4OTkzYmI3YTA4NGE0In0sImlhdCI6MTczMzA2NzY3NH0.jhnsZ9WkDZTAvkHVRoTprex1JuDu4iMDmTs459mxkuw',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({email:credentials.email,password:credentials.password})
      });
const json=await response.json();
console.log(json)
if (json.success){
  //Save the authtoken and redirect
localStorage.setItem('token',json.authtoken);
history("/")
props.showAlert("Logged in Successfully","success")

}
else{
 props.showAlert("Invalid Details","danger")
}
    

  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="mt-2">
      <h2>Login to continue to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary my-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
