import '../styles/Header.css'
import * as React from 'react';
import { Link } from '@mui/material';
import { connect } from "react-redux";
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';

function Header1(props) {

  const navigate = useNavigate();
  const dispatch = props.dispatch;
  const isauth = props.isauth;
  const users = props.users;
  const username = [];

  users.users.forEach((user)=>{
    if(user.email === isauth.email){
      username[0] = user.name
    }
  })

  const handleLogOut = () => {
    navigate("/");

    dispatch({
      type: "IS_AUTH",
      payload: {
        isAuth: false
      }
    });
  }

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

              welcome, &nbsp; {[username]} !

            </Typography>
          </Typography>

          <Link style={{ textDecoration: 'none', marginLeft: '30px' }}>
            <Button onClick={handleLogOut}
              className='LogOutBtn'
              variant="outlined"
              endIcon={<LogoutIcon className='logout_icon'/>}
            >
              Log out
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = state => ({ 
  users: state.users,
  isauth: state.isauth
});

export default connect(mapStateToProps)(Header1)