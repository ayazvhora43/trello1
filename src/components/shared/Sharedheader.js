import './Styles/Sharedheader.css'
import * as React from 'react';
import { connect } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Sharedheader(props) {

  const users = props.users;
  const username = [];
  const data = props.data;

  users.users.forEach((user)=>{
    if(user.email === data){
      username[0] = user.name
    }
  })

  return (
    < >
      <AppBar position="static" sx={{ bgcolor: " rgba(0, 0, 0, 0.1)", borderBottom: "1px solid #ffffff25" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className='trello_app_text'
          >
            Trello Web App

            <Typography className="board_username"
              sx={{
                display: 'inline',
                float: 'right',
                margin: '0 20px 0 0',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>

              this board is shared from &nbsp;{[username]} !

            </Typography>
          </Typography>

        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = state => ({ 
  users: state.users,
  isauth: state.isauth
});

export default connect(mapStateToProps)(Sharedheader)