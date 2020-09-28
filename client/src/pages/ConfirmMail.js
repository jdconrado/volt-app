import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Confirm from '../components/Confirm';
import Congrats from '../components/SignUpCongrats';

import './ConfirmMail.css';

function ConfirmMail(){
    const location = useLocation();
    const [component, setComponent] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const params = location.search.substring(1).split('&')
        params.some(el=>{
            const param =  el.split('=');
            if(param[0]==='action'){
                switch (param[1]) {
                    case 'congrats':
                        setComponent(<Congrats/>);
                        break;
                    case 'confirm':
                        setComponent(<Confirm params={params}/>);
                        break;
                    default:
                        break;
                }
                return true;
            }
        });
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
        <div className="flex fh dark-mode">
            {component}
        </div>
    );
}

export default ConfirmMail;