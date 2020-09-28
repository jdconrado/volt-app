import React from 'react';
import './ConfirmSignUp.css';

function SignUpCongrats(){
    return(
        <div className="center-inflex">
            <div id="congrats-message">
                <div id="logo-holder">
                    <img src={require('../assets/LOGO_VOLT.svg')} alt="logo"/>
                </div>
                <h2><strong>Congrats! You've successfully signed up.</strong></h2>
                <p>
                    We are happy to have you. We've sent you a mail in order to confirm your email address,
                    please follow the instructions in the mail.<br/>
                    <br/>
                    We'll be happy to see you soon!
                </p>
            </div>
        </div>
    )
}

export default SignUpCongrats;