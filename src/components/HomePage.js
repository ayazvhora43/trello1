import * as React from 'react';
import '../styles/HomePage.css'
import { Component } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import ui from '../Assets/Images/ui.png';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';

class Home extends Component {

  render() {
    return (
      <div className='home'>
        <Container className='mui_container' maxWidth="xl" sx={{ backgroundColor: '#eae7fed0' }}>
          <AppBar className='Navbar_box' position="static" sx={{ bgcolor: " rgba(0, 0, 0, 0)" }}>
            <Toolbar className='toolbar_box'>
              <LogoDevIcon className='dev_logo' color="primary" />
              <span
                className='Trello_logo_text'
              >
                Trello
              </span>
              <Stack direction="row" spacing={2} className='btn-container'>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" className='login_btn' endIcon={<LoginIcon className='login_icon'/>}>
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" className='signup_btn' endIcon={<PersonAddAltSharpIcon className='signup_icon'/>}>
                    Sign up
                  </Button>
                </Link>
              </Stack>
            </Toolbar>
          </AppBar>
        </Container>
        <Container className='Trello__text' maxWidth="lg">
          <Box sx={{ height: '100%' }} >
            <Grid container spacing={2}>
              <Grid item xs={12} md={7} className="Trello_text_container">
                <Typography variant="h3" className='Trello_main_text' component="h2">
                  Trello helps teams move work forward.
                </Typography>
                <Box className="Trello_sub_text">
                  Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello.
                </Box>
                    <Grid item xs={12} md={12} className='signup_btn1'>
                      <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" > Sign up-it's free!</Button>
                      </Link>
                  </Grid>
              </Grid>
              <Grid item xs={12} md={5} className='grid1'>
                <img
                  className='trello_img'
                  component="img"
                  alt="The house from the offer."
                  src={ui}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container maxWidth="lg" className='Trello_div2'>
          <Typography variant="h4" className='Trello_div2_text' component="h2">
            It’s more than work. It’s a way of working together.
          </Typography>
          <Typography className='Trello_div2_sub_text'>
            Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.
          </Typography>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="large" sx={{ fontWeight: 'bolder' }} endIcon={<ArrowRightAltIcon />}>
              Start doing
            </Button>
          </Link>
        </Container>
      </div>
    );
  }
}

export default Home;
