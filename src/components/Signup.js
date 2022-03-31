import React from 'react'
import '../styles/Signup.css'
import shortid from "shortid";
import { Component } from 'react'
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import { connect } from "react-redux";
import { Button } from '@mui/material';
import { Navigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import ui1 from '../Assets/Images/ui3.png'
import ui2 from '../Assets/Images/ui4.png'
import { FormControl } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppleIcon from '@mui/icons-material/Apple';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import ExploreIcon from '@mui/icons-material/Explore';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '80%',
    height: '1rem',
};

class Signup extends Component {
    state = {
        formData: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            userId: shortid.generate()
        },
        submitted: false,
        clicked: false,
        clicked1: false,
        ragistered: false,
        redirect: false,
        error: false
    }

    constructor(props) {
        super(props);

        if (!ValidatorForm.hasValidationRule('isPasswordMatch')) {
            ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
                const { formData } = this.state;
                if (value !== formData.password) {
                    return false;
                }
                return true;
            });
        }
    }

    componentWillUnmount() {
        if (ValidatorForm.hasValidationRule('isPasswordMatch')) {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;

        if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }
        this.setState({ formData });
    }

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { users } = this.props;
        const usersemails = []

        this.setState({ submitted: true }, () => {
            setTimeout(() => {
                this.setState({ submitted: false });
            }, 3000);
        });

        users.users.map((user) => {
            return usersemails.push(user.email)
        })

        if (usersemails.includes(this.state.formData.email)) {
            this.setState({ ragistered: true })
        } else {
            this.setState({ ragistered: false })
        }

        if (this.state.ragistered) {
            this.setState({ error: true })
            this.setState(
                {
                    formData: {
                        name: '',
                        email: '',
                        password: '',
                        repeatPassword: ''
                    }
                })
            setTimeout(() => {
                this.setState({ error: false })
            }, 3000);
        } else {
            dispatch({
                type: "ADD_NEW_USER",
                payload: { formdata: this.state.formData }
            });
            this.setState({ redirect: true })
        }
    }

    handleClicked = () => {
        this.setState({ clicked: true })
    }

    handleClicked1 = () => {
        this.setState({ clicked1: true })
    }

    render() {
        const { formData, submitted } = this.state;
        const { clicked } = this.state;
        const { clicked1 } = this.state;

        return (
            <div className='signup'>
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
                        {this.state.error &&
                            <Stack sx={{ width: '100%', margin: '20px 0 0 0' }}>
                                <Alert severity="error">This email is Already Ragistered!</Alert>
                            </Stack>}
                        <img
                            className='trello_img1'
                            component="img"
                            alt='3D img 3'
                            src={ui1}
                        />
                        <img
                            className='trello_img2'
                            component="img"
                            alt='3D img 4'
                            src={ui2}
                        />
                        <Typography sx={{
                            color: '#5E6C84',
                            margin: '50px 0 20px 0',
                            fontWeight: "bold"
                        }}>
                            Sign up for your account
                        </Typography>

                        <ValidatorForm
                            ref={r => (this.form = r)}
                            onSubmit={this.handleSubmit}
                        >
                            <TextValidator
                                name="name"
                                label="Enter Name"
                                className='textFields'
                                value={formData.name}
                                onChange={this.handleChange}
                                validators={['required']}
                                id="demo-helper-text-aligned-helper1"
                                sx={{ margin: '10px 0' }}
                                errorMessages={['this field is required', 'name is not valid']}
                            />

                            <TextValidator
                                name="email"
                                label="Enter Email"
                                className='textFields'
                                value={formData.email}
                                onChange={this.handleChange}
                                validators={['required', 'isEmail']}
                                id="demo-helper-text-aligned-helper2"
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
                                id="demo-helper-text-aligned-no-helper3"
                                sx={{ margin: '10px 0' }}
                                errorMessages={['this field is required', 'password must be 8 characters long']}
                            />

                            <TextValidator
                                type="password"
                                name="repeatPassword"
                                label="Enter Confirm Password"
                                className='textFields'
                                value={formData.repeatPassword}
                                validators={['required', 'isPasswordMatch']}
                                onChange={this.handleChange}
                                id="demo-helper-text-aligned-no-helper4"
                                sx={{ margin: '10px 0' }}
                                errorMessages={['this field is required', 'password mismatch']}
                            />

                            <Typography className='signup_text'>
                                By signing up, you confirm that you've read and accepted our
                                <Link href='#'>
                                    <span className='term_service_text'>
                                        Terms of Service
                                    </span>
                                </Link>
                                and
                                <Link href='#'>
                                    <span className='term_service_text'>
                                        Privacy Policy.
                                    </span>
                                </Link>
                            </Typography>

                            <Link sx={{ textDecoration: "none" }}>
                                <Button variant="contained" className='submit_btn' type="submit" disabled={submitted} color="success">
                                    {
                                        (submitted && 'please wait...')
                                        || (!submitted && 'Sign up')
                                    }
                                    {this.state.redirect ? (<Navigate push to={'/login'} />) : null}
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

                        <Link href='#' onClick={this.handleClicked} className='bottom_links' sx={{ padding: '20px 0' }}>
                            {
                                (clicked && <Navigate to="/login" />)
                            }
                            Already have an account? Log In
                        </Link>
                    </FormControl>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({ users: state.users });

export default connect(mapStateToProps)(Signup)