import React from 'react';
import { Card } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router';

const Sharedcards = (props) => {

    const [redirect, setredirect] = useState(false);
    const [data, setdata] = useState('')

    const handleClick = (id) => {
        setredirect(true)
        setdata(id)
    }
    return (
        <>
            {props.sharedauth.map((auth) => {
                let str = auth.substring(0, auth.indexOf("@"));
                return (
                    <>
                        {
                            redirect && <Navigate push to={'/shared'} state={data} />
                        }
                        <Card
                            index={props.sharedauth.indexOf(auth)}
                            onClick={() => {handleClick(auth)}}
                            sx={{
                                width: '200px',
                                height: '130px',
                                margin: '0 20px',
                                color: 'black',
                                display: 'flex',
                                textAlign: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                padding: '0 30px'
                            }}>
                            shared board of {' '}
                            {str}
                        </Card>
                    </>
                )
            })}
        </>
    )
}

export default Sharedcards