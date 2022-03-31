import React from 'react';
import { connect } from "react-redux";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Box from "@mui/material/Box";

const Replycommentcards = (props) => {

    const commentindex = props.commentindex;

    const replies = props.replies

    const handleDeleteReply = (y) => {
        let dispatch = props.dispatch;
        console.log(commentindex)
        if (window.confirm("delete this comment?")) {
            dispatch({
                type: "DELETE_REPLY_COMMENT",
                payload: { index: y, commentindex: commentindex }
            });
        }
    }

    // const handleUpdateReply = (y) => {
    //     let dispatch = props.dispatch;
    //     console.log(commentindex)
    //     if (window.confirm("delete this comment?")) {
    //         dispatch({
    //             type: "DELETE_REPLY_COMMENT",
    //             payload: { index: y, commentindex: commentindex }
    //         });
    //     }
    // }

    return (
        replies.map((x, y) => {
            return (
                <Box>
                    <Card
                        Id={y}
                        sx={{
                            width: '20%',
                            minWidth: 100,
                            padding: '0',
                            margin: '5px 100px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            boxShadow: 'none',
                            border:'none'
                        }}>
                        <Typography
                            variant="body2"
                            style={{
                                margin: '0',
                                padding: '0 20px',
                                display: 'inline',
                                width: '100px'
                            }}
                        >
                            {x}
                        </Typography>
                        <Link sx={{fontSize: '12px', textDecoration: 'none'}} onClick={() => { handleDeleteReply(y) }}> Delete</Link>
                    </Card>
                </Box>
            )
        })
    )
}

const mapStateToProps = state => ({
    board: state.board,
    users: state.users,
    comments: state.comments
});

export default connect(mapStateToProps)(Replycommentcards);