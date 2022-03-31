import React from 'react'
import { useState } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Form } from 'react-bootstrap';
import { Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { IoIosSend } from 'react-icons/io';

const Sharedcomments = (props) => {

    const [commentInput, setCommentInput] = useState('')

    const handleCommentInput = (e) => {
        setCommentInput(e.target.value)
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
                    placeholder='Disabled'
                    style={{
                        width: '500px',
                        margin: '20px',
                        display: 'inline',
                        color: '#172B4d',
                    }} />
                <Box>
                    <IoIosSend style={{fontSize: '30px'}}/>
                </Box>
            </Box>
        </>
    )
}

const mapStateToProps = state => ({
    board: state.board,
    users: state.users
});

export default connect(mapStateToProps)(Sharedcomments);