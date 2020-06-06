import React from 'react'
import { Alert } from 'react-bootstrap'

export default function AlertDismissible(props){
    const isErr = props.isErr
    const errMessage = props.messErr;
    if(isErr)
    {
        console.log('error')
        return(
            <div>
                <Alert bsStyle='danger'>
                    {errMessage}
                </Alert>
            </div>
        )
    }
    console.log('no error')
    return <div>Ya rien</div>
}