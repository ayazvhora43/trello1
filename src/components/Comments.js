import React from 'react'
import { useState } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Form } from 'react-bootstrap';
import Commentlists from './Commentlists';
import { Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { IoIosSend } from 'react-icons/io';

const Comments = (props) => {

    const [commentInput, setCommentInput] = useState('')
    const Id = props.cardId

    const handleCommentInput = (e) => {
        setCommentInput(e.target.value)
    }

    const handleSaveComment = () => {

        let dispatch = props.dispatch;
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const dateandtime = date + ' ' + time;

        let obj = {}
        obj.cardId = Id;
        obj.comment = commentInput;
        obj.dateandtime = dateandtime;
        obj.replies = []

        if (commentInput) {
            dispatch({
                type: "ADD_COMMENT",
                payload: { obj: obj }
            });
            setCommentInput('')
        } else {
            alert('please add some text in comment.')
        }
    }

    return (
        <>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid #e8e8e8'
                }}>
                <CommentIcon style={{ display: 'inline', color: '#172B4d' }} />
                <Typography style={{
                    display: 'inline',
                    padding: '0 10px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: "#172B4D",
                    margin: '0 10px',
                }}>
                    Comments
                </Typography>
            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
            >
                <Commentlists commentInput={commentInput} id={Id} />
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '1px solid #e8e8e8',
                    backgroundColor: '#e8e8e8'
                }}>
                <Form.Control
                    type="text"
                    value={commentInput}
                    className= 'add_comment'
                    onChange={handleCommentInput}
                    placeholder='Write a comment...'
                    style={{
                        width: '500px',
                        margin: '20px',
                        display: 'inline',
                        color: '#172B4d',
                    }} />
                <Box>
                    <IoIosSend onClick={handleSaveComment} style={{fontSize: '30px'}}/>
                </Box>
            </Box>
        </>
    )
}

const mapStateToProps = state => ({
    board: state.board,
    users: state.users
});

export default connect(mapStateToProps)(Comments);