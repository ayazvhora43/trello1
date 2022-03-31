import React from "react";
import "../styles/App.css";
import Board from "./Board";
import Header from "./Header";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function App(props) {

  const state = useLocation();
  const [msg, setMsg] = useState("")
  const [done, setdone] = useState(false);

  const handleCallback = (childData) => {
    setMsg(childData)
  }

  useEffect(() => {
    setTimeout(() => {
      setdone(true)
    }, 1000);
  }, [])

  if (done) {
    return (
      <div className="App">
        <Header parentCallback={handleCallback} username={[state.state]} />
        <Board searchInput={msg} username={[state.state]} />
      </div>
    );
  } else {
    return(
    <Container maxWidth="xl" className='loader'>
      <Typography className='loading_text'>
        Loading ...
      </Typography>
      <CircularProgress className='loading_spinner' />
    </Container>
    )
  }

}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps)(App)
