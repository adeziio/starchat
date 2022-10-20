import React, { useState } from 'react';
import { Button, FormControl, Alert, TextField, CircularProgress } from '@mui/material';
import Register from './Register';
import KawaiiAnimation from './../utils/KawaiiAnimation';
import { fetchLogin } from './../../api/starchat-backend';

const Login = (props) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [resStatus, setResStatus] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleUserChange = (e) => {
        setUserName(e.target.value.replace(/\s+/g, '').toLowerCase());
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            login(username, password);
        }
    }

    const login = async (username, password) => {
        if (username !== "" && password !== "") {
            setResStatus("");
            setResMessage("");
            setIsLoading(true);
            const response = await fetchLogin(username, password);
            if (response) {
                setResStatus(response.status);
                setResMessage(response.message);
                if (response.status === "success") {
                    props.setUserName(response.username);
                }
            }
            else {
                setResStatus("error");
                setResMessage("Service Unavailable");
                props.setUserName("");
            }
            setUserName("");
            setPassword("");
            setIsLoading(false);
        }
        else {
            setResStatus("error");
            setResMessage("Missing username or password");
        }
    }

    return (
        <>
            <KawaiiAnimation />
            <FormControl variant="standard">
                <TextField sx={{ width: "20rem", marginTop: 1 }} label="Username" variant="outlined"
                    value={username}
                    onChange={(e) => handleUserChange(e)}
                    onKeyDown={_handleKeyDown}
                />
                <TextField sx={{ width: "20rem", marginTop: 1 }} label="Password" variant="outlined"
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                    onKeyDown={_handleKeyDown}
                    type="password"
                />
                <Button sx={{ width: "20rem", marginTop: 1 }} type="button" color="primary" variant="contained"
                    onClick={(e) => login(username, password)}>
                    Log In
                </Button>
                <Register />
                <Alert sx={{ marginTop: 1 }} severity={resStatus}>{resMessage}</Alert>
                {isLoading ? <CircularProgress sx={{ marginTop: 1, margin: "auto", padding: "1rem" }} /> : null}
            </FormControl>
        </>
    )
}

export default Login;