import React from 'react';
import { useState } from 'react';
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from '@mui/material';

const Replycomment = (props) => {

    const [addingcomment, setaddingcomment] = useState(false);
    const [replyInput, setreplyInput] = useState('');

    const handlereplyinput = (e) => {
        setreplyInput(e.target.value)
    }

    const handlesave = () => {
        if (replyInput) {

            let dispatch = props.dispatch;
            const replytext = replyInput;
            const index = props.index;

            dispatch({
                type: "ADD_REPLY",
                payload: { index: index, replytext: replytext }
            });
            setaddingcomment(false)
            setreplyInput('')
        } else {
            alert('please add some reply!')
        }
    }

    const handleAddReply = () => {
        setaddingcomment(true)
    }

    if (addingcomment) {
        return (
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'inline'
                }}>
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder='add reply...'
                    onChange={handlereplyinput}
                    style={{
                        width: '130px',
                        height: '30px',
                        margin: '10px 20px',
                        display: 'inline',
                        color: '#172B4d',
                        display: 'inline'
                    }} />
                <Box sx={{
                    display: 'inline'
                }}>
                    <Link onClick={handlesave} style={{ height: '40px', marginRight: '10px', textDecoration: 'none' }}>
                        save
                    </Link>
                    <CloseIcon onClick={() => {
                        setaddingcomment(false)
                    }} />
                </Box>
            </Box>
        )
    }
    else {
        return (
            <Link onClick={handleAddReply} style={{ margin: '10px 0 10px 15px', border: 'none', fontSize: '12px', textDecoration: 'none' }}> Reply</Link>
        )
    }
}

const mapStateToProps = state => ({
    board: state.board,
    users: state.users
});

export default connect(mapStateToProps)(Replycomment);