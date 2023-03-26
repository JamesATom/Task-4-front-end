import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

export function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }
  
    return (
        <Button
            variant="outlined"
            onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light');
            }} >
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
        </Button>
    );
}
  
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [filled, setFilled] = useState(true);
    const [errorOfLogin, setErrorOfLogin] = useState(null);
    const re = /\S+@\S+\.\S+/;

    useEffect(() => {
        setFilled(email && password ? false : true);
    }, [email, password]);

    const isValidEmail = (email) => re.test(email);

    const handleEmailChange = ({target}) => {
        setError(!isValidEmail(target.value) ? 'Email is invalid' : null);
        setEmail(target.value);
    };
    const handlePasswordChange = ({target}) => setPassword(target.value);
    
    const handleSubmit = () => {
        axios.post('https://task-4-back-end-production-9cf4.up.railway.app/users/login', { "email": email, "password": password })
            .then((res) => {
                if (res.data == 'success')
                    return res.data;
            }, networkError => console.log(`Network Error ${networkError}`)
            )
            .then(finalResponse => {
                if (finalResponse == 'success') {
                    window.sessionStorage.setItem("email", email);
                    window.sessionStorage.setItem("signed", true);
                    navigate('/home');
                } else {
                    setErrorOfLogin('Email or Password is not correct');
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
                        <Typography level="body2">Log in to continue.</Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {error && <h2 style={{
                            color: 'red', 
                            fontSize: '12px', 
                            alignSelf: 'self-start',
                            marginLeft: '2px'}}>{error}</h2>}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel> 
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errorOfLogin && <h2 style={{
                            color: 'red', 
                            fontSize: '12px', 
                            alignSelf: 'self-start',
                            marginLeft: '2px'}}>{errorOfLogin}</h2>}
                    </FormControl> 
                    <Button sx={{ mt: 1 }} type='submit' onClick={handleSubmit} disabled={filled}>
                        Log in
                    </Button>
                    <Typography
                        endDecorator={<Link to="/sign-up">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }} >
                        Don't have an account?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </Stack>
    );
}

export default Login;



