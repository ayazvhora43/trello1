import '../styles/Header.css'
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@mui/material';
import { connect } from "react-redux";
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Form } from 'react-bootstrap';
import FormControl from '@mui/material/FormControl';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header(props) {

  const { parentCallback } = props;
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [boardname, setboardname] = useState('');
  const dispatch = props.dispatch;
  const isauth = props.isauth;
  const users = props.users;
  const username = [];
  const printboardname = [];

  users.users.forEach((user) => {
    if (user.email === isauth.email) {
      username[0] = user.name
      printboardname[0] = user.boardname;
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

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  };

  const handleChangeboard = (e) => {
    setboardname(e.target.value);

    const dispatch = props.dispatch;
    dispatch({
      type: "ADD_BOARD_NAME",
      payload: { boardname: e.target.value, username: username }
    });
  }

  useEffect(() => {
    setSearchInput(searchInput)
    parentCallback(searchInput);
  }, [searchInput]);

  return (
    < >
      <AppBar position="static" sx={{ bgcolor: " rgba(0, 0, 0, 0.1)", borderBottom: "1px solid #ffffff25" }}>
        <Toolbar>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            className='trello_app_text'
          >
            Trello Web App

          </Typography> */}
          <Box className='trello_app_text' component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: '25ch' }}>
              <Form.Control
                value={[printboardname]}
                type="text"
                className="form-control board_input"
                id="exampleInputtext"
                placeholder="Enter Board Name here..."
                onChange={handleChangeboard}
              />
            </FormControl>
          </Box>
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

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Link style={{ textDecoration: 'none', marginLeft: '30px' }}>
            <Button onClick={handleLogOut}
              className='LogOutBtn'
              variant="outlined"
              endIcon={<LogoutIcon className='logout_icon' />}
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

export default connect(mapStateToProps)(Header)