import React from 'react'
import Alert from '@mui/material/Alert';

const MessageAlert = ( props ) => {
    const { type, message, isHidden } = props
    
    const messageBoxRender = () => {
        return (
            <Alert severity={type} style={{width: '100%', marginLeft:'2%'}}>{message}</Alert>
        )
    }

    return(
        isHidden?
        <></>:
        messageBoxRender()
    )
}

export default MessageAlert