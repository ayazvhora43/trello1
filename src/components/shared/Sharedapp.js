import React from 'react';
import Sharedheader from './Sharedheader';
import Sharedboard from './Sharedboard';
import { useState } from 'react';
import { useEffect } from "react";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Sharedapp = (props) => {
    const state = useLocation();
    const [done, setdone] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setdone(true)
        }, 1000);
      }, [])
    
    if (done) {
        return (
          <div className="SharedApp">
            <Sharedheader data={state.state}/>
            <Sharedboard sharedemail={state.state}/>
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

export default Sharedapp