import React, { useCallback, useState } from 'react';
import config from '../config.json';

import './Register.css';

function Register(){
    const [user, setUser]= useState({
        username: '',
        password: '',
        mail:'',
        name:'',
        lastname:''
    });
    const [error, setError] = useState({
        on: false,
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const changeHandler = useCallback((event)=>{
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    },[user])
    const submitHandler = useCallback((event)=>{
        event.preventDefault();
        setLoading(true);
        setError({
            on: false,
            message: ''
        });
        fetch(`${config.API_URL}/user/signup`,{
            method:'POST',
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({data: user})
        }).then(async (res)=>{
            if(res.status === 201){
                //Enviar a pag de confirmar mail
                //history.push('/home');
            }else{
                const response = await res.json();
                if(response.username || response.mail){
                    setError({
                        on:true,
                        message: 'This username and/or email have already been taken.'
                    });
                }else{
                    if(response.password){
                        setError({
                            on:true,
                            message: 'Password '+response.password[0]+'.'
                        });
                    }else{
                        setError({
                            on:true,
                            message: 'There has been an error, please try again later.'
                        });
                    }
                }
            }
            setLoading(false);
        });
    },[user])
    return(
        <div className="flex dark-mode">
            <div className="flex logo-shadow fh">
                <div className="center-inflex">
                    <img src={require('../assets/LOGO_SOMBRA_VOLT.svg')} alt="logo-icon" id="logo"/>
                </div>
            </div>
            <div className="flex user-form fh">
                <div id="form-space" className="center-inflex">
                {loading? (
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ):(
                        <div>
                            <img src={require('../assets/LOGO_VOLT.svg')} alt="logo" id="logo-form"/>
                            <h2><strong>You're one step closer...</strong></h2>
                            {error.on? (
                                <div className="alert alert-danger" role="alert">
                                    {error.message}
                                </div>
                            ): '' }
                            <form onSubmit={submitHandler} id="signup-form">
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="text" className="form-control" name="name" placeholder="Name" value={user.name}/>
                                </div>
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="text" className="form-control" name="lastname" placeholder="Lastname" value={user.lastname}/>
                                </div>
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="text" className="form-control" name="username" placeholder="Username" value={user.username}/>
                                </div>
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="email" className="form-control" name="mail" placeholder="Email" value={user.mail}/>
                                </div>
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="password" className="form-control" name="password" placeholder="Password" value={user.password}/>
                                </div>
                                <button type="submit" className="btn btn-block btn-op1">
                                    <strong>Sign Up</strong>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;