import React from 'react';
import { useState } from 'react';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import { connect } from "react-redux";
import { Form } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Replycomment from './Replycomment';
import Replycommentcards from './Replycommentcards';
import { Link } from '@mui/material';
import moment from 'moment';
import { FaUserCircle } from 'react-icons/fa';

const CommentEditor = (props) => {

  const [toggle, settoggle] = useState(false);
  const [commentInput, setcommentInput] = useState('');
  const [commentTtitle, setcommentTtitle] = useState(props.comment);
  const [value, setvalue] = useState(0)
  const index = props.index;
  const replies = props.replies;
  const dateandtime = props.dateandtime;

  const toggleopen = () => {
    settoggle(true)
  }

  const handleCommentInput = (e) => {
    setcommentInput(e.target.value)
  }

  const handlesave = () => {
    settoggle(false)
    let dispatch = props.dispatch;
    const index = props.index;

    if (commentInput) {
      setcommentTtitle(commentInput)
      dispatch({
        type: "EDIT_COMMENT",
        payload: { comment: commentInput, index: index }
      });
    } else {
      alert('either delete or add some text while editing comment')
    }
  }

  const handledelete = () => {
    let dispatch = props.dispatch;
    const index = props.index;

    if (window.confirm("delete this comment?")) {
      dispatch({
        type: "DELETE_COMMENT",
        payload: { index: index }
      });
      settoggle(false)
      setvalue(value => value + 1)
    }
  }

  if (!toggle) {
    return (
      <>
        {/* <Box
          sx={{ 
            width: '90%',
            backgroundColor: '#f2f2f2',
            boxShadow: '1px 1px 2px 2px rgb(230, 230, 230)',
            borderRadius: '4px',
            margin: '10px'
            }}> */}
        
        <Card
          sx={{
            width: '90%',
            height: '100%',
            minWidth: 275,
            margin: '10px 20px 10 0 ',
            backgroundColor: '#fff',
            borderTop: '1px solid #d4d4d4',
            borderRadius: '0',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column'
          }}>
          
          <Box
            variant="h2"
            style={{
              padding: '5px 20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
          <FaUserCircle style={{marginRight: '20px', fontSize: '25px', transform:'translateY(10px)'}}/>
            You
            <Typography sx={{ display: 'inline', fontSize: '12px', paddingLeft: '15px', color: '#8c8c8c' }}>
              {moment(dateandtime).fromNow(true)} ago...
            </Typography>
          </Box>

          <Typography
            variant="body2"
            style={{
              padding: '5px 65px',
              fontSize: '14px'
            }}
          >
            {commentTtitle}
          </Typography>


        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: '52px' }}>
          <Link onClick={toggleopen} style={{ margin: '10px 0 10px 15px', border: 'none', fontSize: '12px', textDecoration: 'none' }}> Edit</Link>
          <Link onClick={handledelete} style={{ margin: '10px 0 10px 15px', border: 'none', fontSize: '12px', textDecoration: 'none' }}> Delete</Link>
          <Replycomment index={index} />
        </Box>
        <Replycommentcards commentindex={index} replies={replies} />
        {/* </Box> */}
      </>
    )
  } else {
    return (
      <Card
        sx={{
          width: '60%',
          minWidth: 275,
          margin: '0 10px',
          border: 'none',
          boxShadow: 'none'
        }}>
        <Form.Control
          autoFocus
          type="text"
          className='add_comment'
          onChange={handleCommentInput}
          defaultValue={commentTtitle}
          style={{
            width: '50%',
            height: '30px',
            margin: '8px 20px',
            display: 'inline',
            color: '#172B4d',
          }} />
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Link onClick={handlesave} style={{ margin: '5px 0 5px 25px', textDecoration: 'none' }}> Save </Link>

          <ion-icon
            onClick={() => { settoggle(false) }}
            name="close"
            style={{
              fontSize: '20px',
              marginLeft: '10px'
            }} />
        </Box>
      </Card>

    )
  }
}

const mapStateToProps = state => ({
  board: state.board,
  users: state.users,
  comments: state.comments
});

export default connect(mapStateToProps)(CommentEditor);