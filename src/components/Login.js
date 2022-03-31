import React from 'react'
import '../styles/Login.css'
import { Component } from 'react'
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import { connect } from "react-redux";
import { Button } from '@mui/material';
import { Navigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import ui1 from '../Assets/Images/ui1.png'
import ui2 from '../Assets/Images/ui2.png'
import { FormControl } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppleIcon from '@mui/icons-material/Apple';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import ExploreIcon from '@mui/icons-material/Explore';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '80%',
  height: '1rem',
};

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    submitted: false,
    clicked: false,
    clicked1: false,
    redirect: false,
    error1: false,
    error2: false
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit = () => {
    const { users } = this.props;
    const usersemails = []
    const userspasswords = []

    this.setState({ submitted: true }, () => {
      setTimeout(() => {
        this.setState({ submitted: false });
      }, 3000);
    });

    users.users.map((user) => {
      return usersemails.push(user.email)
    })

    users.users.map((user) => {
      return userspasswords.push(user.password)
    })

    if (usersemails.includes(this.state.formData.email)) {
      let index = usersemails.indexOf(this.state.formData.email)
      if ((userspasswords[index] === this.state.formData.password)) {
        this.setState({ redirect: true })
        const { dispatch } = this.props;
        dispatch({
          type: "IS_AUTH",
          payload: {
            isAuth: true,
            email: this.state.formData.email
          }
        });
      } else {
        this.setState({ error1: true })
        this.setState(
          {
            formData: {
              email: '',
              password: '',
            }
          })
        setTimeout(() => {
          this.setState({ error1: false })
        }, 2000);
      }
    } else {
      this.setState({ error2: true })
      this.setState(
        {
          formData: {
            email: '',
            password: '',
          }
        })
      setTimeout(() => {
        this.setState({ error2: false })
      }, 2000);
    }
  }

  handleClicked = () => {
    this.setState({ clicked: true })
  }

  handleClicked1 = () => {
    this.setState({ clicked1: true })
  }

  componentWillMount() {
    this.setState({ done: false })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ done: true })
    }, 500);
  }

  render() {
    const { formData, submitted } = this.state;
    const { clicked } = this.state;
    const { clicked1 } = this.state;

    return (
      <>
        <div className='login'>
          <Container maxWidth="xl" >
            <AppBar className='Logo_box' position="static" sx={{ bgcolor: " rgba(0, 0, 0, 0)" }}>
              <Toolbar>
                <LogoDevIcon className='dev1_logo' color="primary" />
                <Link href='#' onClick={this.handleClicked1} sx={{ textDecoration: 'none' }}>
                  {
                    (clicked1 && <Navigate to="/" />)
                  }
                  <Typography
                    variant="h6"
                    component="div"
                    className='trello_heading_text'
                  >
                    Trello
                  </Typography>
                </Link>
              </Toolbar>
            </AppBar>
          </Container>
          <Container className='form_container'>
            <FormControl className='form_control'>
              {this.state.error1 &&
                <Stack sx={{ width: '100%', margin: '20px 0 0 0' }}>
                  <Alert severity="error">Incorrect Password, please try again!</Alert>
                </Stack>}
              {this.state.error2 &&
                <Stack sx={{ width: '100%', margin: '20px 0 0 0' }}>
                  <Alert severity="error">Please complete ragistration process first!</Alert>
                </Stack>}
              <img
                className='trello_img1'
                component="img"
                alt='3D img 1'
                src={ui1}
              />
              <img
                className='trello_img2'
                component="img"
                alt='3D img 1'
                src={ui2}
              />
              <Typography sx={{
                color: '#5E6C84',
                margin: '50px 0 20px 0',
                fontWeight: "bold"
              }}>
                Log in to Trello
              </Typography>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                className='form_validator'
              >
                <TextValidator
                  name="email"
                  label="Enter Email"
                  className='textFields'
                  value={formData.email}
                  onChange={this.handleChange}
                  validators={['required', 'isEmail']}
                  id="demo-helper-text-aligned-no-helper1"
                  sx={{ margin: '10px 0' }}
                  errorMessages={['this field is required', 'email is not valid']}
                />

                <TextValidator
                  type="password"
                  name="password"
                  label="Enter Password"
                  className='textFields'
                  value={formData.password}
                  validators={['required', 'minStringLength: 8']}
                  onChange={this.handleChange}
                  id="demo-helper-text-aligned-no-helper2"
                  sx={{ margin: '10px 0 20px 0' }}
                  errorMessages={['this field is required', 'password must be 8 characters long']}
                />

                <Link sx={{ textDecoration: "none" }}>
                  <Button variant="contained" type="submit" className='submit_btn' disabled={submitted} color="success">
                    {
                      (submitted && 'Please wait...')
                      || (!submitted && 'Log in')
                    }
                    {this.state.redirect ? (<Navigate push to={'/boards'} state={formData} />) : null}
                  </Button>
                </Link>

              </ValidatorForm>

              <Typography sx={{
                color: '#5E6C84',
                margin: '30px 0',
                fontWeight: "bold"
              }}>
                OR
              </Typography>

              <Link href='https://myaccount.google.com/' sx={{ textDecoration: "none", width: '100%' }}>
                <Button variant="contained" className='continue_button'>
                  <GoogleIcon sx={{ padding: '5px 10px', width: '1.8em', height: '1.2em' }} />
                  Continue with Google
                </Button>
              </Link>

              <Link href='https://www.apple.com/' sx={{ textDecoration: "none", width: '100%' }}>
                <Button variant="contained" className='continue_button'>
                  <AppleIcon sx={{ padding: '5px 10px', width: '1.8em', height: '1.2em' }} />
                  Continue with Apple
                </Button>
              </Link>

              <Link href='https://www.microsoft.com/' sx={{ textDecoration: "none", width: '100%' }}>
                <Button variant="contained" className='continue_button'>
                  <ExploreIcon sx={{ padding: '5px 10px', width: '1.8em', height: '1.2em' }} />
                  Continue with Microsoft
                </Button>
              </Link>

              <Box sx={{ ...commonStyles, borderBottom: 1 }} />

              <Link href='#' onClick={this.handleClicked} className='bottom_links' sx={{ padding: '10px 0' }}>
                {
                  (clicked && <Navigate to="/signup" />)
                }
                can't log in ?
              </Link>
              <Link href='#' onClick={this.handleClicked} className='bottom_links'>
                {
                  (clicked && <Navigate to="/signup" />)
                }
                Sign up for an account
              </Link>
            </FormControl>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps)(Login)
