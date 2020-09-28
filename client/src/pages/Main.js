import React, {useCallback, useState} from 'react';
import { useUserContext } from '../Store';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import config from '../config.json';

import './Main.css';

function Main(){
    const history = useHistory();
    const [current_user, updateUser] = useUserContext();
    const [user, setUser]= useState({
        username: '',
        password: ''
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
        if(!loading){
            setLoading(true);
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
                    await updateUser({reset:true, error: true});
                    history.push('/login');
                }
                setLoading(false);
            });
        }
    },[user, updateUser, loading, history])
    return (
        <div className="dark-mode">
            <div className="flex flex-column">
                <div className="flex top-form">
                    <div className = "center-hor-inflex ">
                        <form onSubmit={submitHandler}>
                            <div className="form-g">
                                <label htmlFor="username">Username</label>
                                <input onChange={changeHandler} type="text" id="username" name="username"/>
                            </div>
                            <div className="group">
                                <div className="form-g">
                                    <label htmlFor="password">Password</label>
                                    <input onChange={changeHandler} type="password" id="password" name="password"/>
                                </div>
                                <Link to="/">Forgot Password?</Link>
                            </div>
                            <div className="group" >
                                {loading? (
                                    <button disabled type="submit" id="b-login" className="btn btn-alpha-op1">
                                        <strong>Log in</strong>
                                    </button> 
                                ):(
                                    <button type="submit" id="b-login" className="btn btn-alpha-op1">
                                        <strong>Log in</strong>
                                    </button> 
                                )}
                                
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex">
                    <div className="center-hor-inflex" >
                        <div id="buttons-part" className="">
                            <div id="upper-part">
                                <img src={require('../assets/LOGO_VOLT.svg')} alt="logo" id="logo"/>
                                <h3>
                                    <strong>Let your voice be heard. Let your sparks be seen.</strong>
                                </h3>
                            </div>
                            <div>
                                <strong>Join Volt.</strong>
                                <div id="buttons">
                                    <Link to="/signup">
                                        <button className="btn btn-block btn-op1">
                                            <strong>Sign Up</strong>
                                        </button>
                                    </Link>

                                    <Link to="/login">
                                        <button className="btn btn-block btn-alpha-op1">
                                            <strong>Log In</strong>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="footer">
                <div className=" flex">
                    <nav className="center-hor-inflex">
                        <Link to="/"> About </Link>
                        <span>&copy; 2020, Volt.</span>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Main;