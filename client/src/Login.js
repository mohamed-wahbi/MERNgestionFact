import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './style/Signup.css';


const Login = () => {
    const [email,setEmail] = useState ();
    const [password,setPassword] = useState ();
    const [mesg,setMesg] = useState ("");
    const navigate = useNavigate ();

    const handeleSubmit = (e)=>{
        e.preventDefault();
        if(email && password)
        {
          axios.post('http://127.0.0.1:9000/fournisseur/loginF',{email,password})
          .then((result)=>{
            console.log(result);
            if(result.status===(200)){
              localStorage.setItem('token', result.data.token);
              navigate('/home');
            } 
        })
        .catch((err)=>console.log(err));
        setMesg("Error : email or password is false !");
        navigate('/')
    }
    else {
      setMesg("Error : All inputs must be filled in ! *_*");
      navigate('/');
  }
  } 
  return (
    <div className='allSignup'>
        <div className='registerSignup'>
            <h2>Register_Page :</h2>
            <form onSubmit={handeleSubmit} className='formSignup'>
        
                <div className='labelSignup'>
                    <label>Email :</label>
                    <input type='email' placeholder='Enter Email' name='email' onChange={(e)=>setEmail(e.target.value)}  />
                </div>

                <div className='labelSignup'>
                    <label>Password :</label>
                    <input type='password' placeholder='Enter Password' name='password' onChange={(e)=>setPassword(e.target.value)}   />
                </div>
                <div className='btnRegisterSignup'>
                    <button type='submit'>Login</button>
                    <p style={{color:'red'}}>{mesg}</p>
                </div>
            </form>

            <div className='alertSignup'>
                <p>You don't have account !</p>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Login