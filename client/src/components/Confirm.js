import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import config from '../config.json';

import './ConfirmSignUp.css';

function Confirm(props){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{
        let token = undefined;
        props.params.some(el=>{
            let param = el.split('=');
            if(param[0] === 'tkn'){
                token = param[1];
                return true;
            }
        });
        if (token){
            fetch(`${config.API_URL}/user/confirmail`, {
                method:'POST',
                credentials:'include',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    data:{
                        confirmation_token: token
                    }
                })
            }).then(res=>{
                if (res.status!==200){
                    setError(true);
                }
            })
        }else{
            setError(true);
        }
        setLoading(false);
    },[]);
    return loading? (
        <div className="flex fw fh">
            <div className="center-inflex">
                <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    ):(
        <div className="center-inflex">
            <div id="congrats-message">
                <div id="logo-holder">
                    <img src={require('../assets/LOGO_VOLT.svg')} alt="logo"/>
                </div>
                {
                    error?(
                        <div>
                            <h2><strong>Oops... Looks like something went wrong :(</strong></h2>
                            <p>
                                There has been an error, please try again later.
                            </p>
                        </div>
                    ):(
                        <div>
                            <h2><strong>Congrats! You're email is verified.</strong></h2>
                            <p>
                                This is amazing! Now you're really part of the community.<br/>
                                <br/>
                                Follow the button to go to login to your account.
                            </p>
                            <Link to="/login">
                                <button className="btn btn-block btn-op1">
                                    <strong>Login</strong>
                                </button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Confirm;