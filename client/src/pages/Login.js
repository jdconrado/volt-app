import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config.json';
import { useUserContext } from '../Store';
import './Login.css';

function Login(er){
    const [current_user, updateUser] = useUserContext();
    const history = useHistory();
    const [user, setUser]= useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(current_user.error);
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
        setError(false);
        fetch(`${config.API_URL}/user/login`,{
            method:'POST',
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({data: user})
        }).then(async (res)=>{
            if(res.status === 200){
                await updateUser();
                history.push('/home');
            }else{
                setError(true);
            }
            setLoading(false);
        });
    },[user, history, updateUser])
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
                            <h2><strong>Welcome!</strong></h2>
                            {error? (
                                <div className="alert alert-danger" role="alert">
                                    Username and/or password are incorrect.
                                </div>
                            ): '' }
                            <form id="login-form" onSubmit={submitHandler}>
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="text" className="form-control" name="username" placeholder="Username" value={user.username}/>
                                </div>
                                <div className="form-group">
                                    <input onChange={changeHandler} required type="password" className="form-control" name="password" placeholder="Password" value={user.password}/>
                                </div>
                                <button type="submit" className="btn btn-block btn-op1">
                                    <strong>Login</strong>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;