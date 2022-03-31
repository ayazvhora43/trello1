import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router';
import Header1 from './Header1';
import { Box } from '@mui/material';
import { Card } from '@mui/material';
import { connect } from "react-redux";
import Sharedcards from './Sharedcards';

const Boards = (props) => {
    const state = useLocation();
    const [redirect, setredirect] = useState(false);
    let auth = {};
    const sharedauth = []

    const handleClick = () => {
        setredirect(true)
    }

    props.users.users.filter((obj) => {
        if (obj.email === state.state.email) {
            auth = obj
        }
    })

    props.shared.shared.filter((obj) => {
        obj.shared.map((name) => {
            if (name === auth.name) {
                sharedauth.push(obj.auth)
            }
        })
    })

    return (
        <div className='boards'>
            <Header1 username={[state.state]} />

            {
                redirect && <Navigate push to={'/trello'} state={state} />
            }
            <Box sx={{
                display: 'block',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '30%',
                left: '22%'
            }}>
                <Card
                    onClick={handleClick}
                    className='card1'
                    sx={{
                        width: '200px',
                        height: '130px',
                        margin: '0 20px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        
                    }}>
                    My Board
                </Card>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '70px 0',
                    }}>
                    <Sharedcards sharedauth={sharedauth} />
                </Box>
            </Box>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users,
    shared: state.shared
});

export default connect(mapStateToProps)(Boards)