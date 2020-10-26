import * as React from 'react';


export default function FlashMessage(props : any){
    return (
        <div>
            {props.message}
        </div>
    );
}

FlashMessage.defaultProps = {
    message: 'an error has occured'
}