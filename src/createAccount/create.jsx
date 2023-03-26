import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { ModeToggle } from '../login page/login';
import axios from 'axios';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorForEmail, setForEmail] = useState(null);
    const [errorForPassword, setForPassword] = useState(null);
    const [filled, setFilled] = useState(true);
    const [errorOfSignUp, setErrorOfSignUp] = useState(null);
    const re = /\S+@\S+\.\S+/;

    useEffect(() => {
        setFilled(username && email && password && confirmPassword ? false : true);
    }, [username, email, password, confirmPassword]);

    useEffect(() => {
        setForPassword(password === confirmPassword ? null : 'Password does not match');
    }, [password, confirmPassword]);

    const handleEmailChange = ({target}) => {
        setForEmail(!isValidEmail(target.value) ? 'Email is not valid' : null);
        setEmail(target.value);
    };
    
    const isValidEmail = (email) => re.test(email);

    const handleSubmit = () => {
        axios.post('https://task-4-back-end-production-9cf4.up.railway.app/users/sign-up', 
        { 
            "username": username,
            "email": email,
            "password": password
        }).then((res) => {
            if (res.data == 'success')
                return res.data;
        }, networkError => console.log(`Network Error: ${networkError}`)
        ).then(finalResponse => {
            if (finalResponse == 'success') {
                window.sessionStorage.setItem("email", email);
                window.sessionStorage.setItem("signed", true);
                navigate('/home')
            } else {
                setErrorOfSignUp('Email or Password is not correct');
            }
        });
    }

    return (
        <Stack spacing={8} direction='column' 
        sx={{ 
            alignItems: 'center',
            justifyContent: 'center',
            height: '935px' }}>
            <CssVarsProvider>
                <ModeToggle />
                <Sheet 
                    sx={{
                        width: 300,
                        mx: 'auto', 
                        my: 4, 
                        py: 3,
                        px: 2, 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    >
                    <div>
                        <Typography level="h4" component="h1">
                            Welcome!
                        </Typography>
                        <Typography level="body2">Sign up to continue.</Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Username</FormLabel> 
                        <Input
                            name="name"
                            type="name"
                            placeholder="Username"
                            value={username}
                            onChange={({target}) => setUsername(target.value)}
                        />
                        {errorOfSignUp && <h2 style={{
                            color: 'red', 
                            fontSize: '12px', 
                            alignSelf: 'self-start',
                            marginLeft: '2px'}}>{errorOfSignUp}</h2>}
                    </FormControl> 
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {errorForEmail && <h2 style={{
                            color: 'red', 
                            fontSize: '12px', 
                            alignSelf: 'self-start',
                            marginLeft: '2px'}}>{errorForEmail}</h2>}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel> 
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel> 
                        <Input
                            name="password"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={({target}) => setConfirmPassword(target.value)}
                        />
                        {errorForPassword && <h2 style={{
                            color: 'red', 
                            fontSize: '12px', 
                            alignSelf: 'self-start',
                            marginLeft: '2px'}}>{errorForPassword}</h2>}
                    </FormControl> 
                    <Button 
                    sx={{ mt: 1 }} 
                    type='submit' 
                    disabled={filled} 
                    onClick={handleSubmit}>
                        Sign up
                    </Button>
                    <Typography
                        endDecorator={<Link to="/">Log in</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }} >
                        Have already an account?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </Stack>
    );
}

export default SignUpPage;

