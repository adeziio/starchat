import React, { useState } from 'react';
import { FormControl, Alert, Dialog, DialogTitle, DialogContent, Button, TextField, CircularProgress, Typography } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { fetchRegisterUser, fetchForgotUsernameAndPassword } from '../../api/starchat-backend';

const Register = () => {
    const [dialog, setDialog] = useState(false);
    const [isForgotUsernameAndPassword, setIsForgotUsernameAndPassword] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [resStatus, setResStatus] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const openDialog = () => {
        setDialog(true);
    }

    const closeDialog = () => {
        setDialog(false);
        setIsForgotUsernameAndPassword(false);
        setUserName("");
        setPassword("");
        setEmail("");
        setResStatus("");
        setResMessage("");
        setIsLoading(false);
    }

    const handleForgotUsernameAndPassword = () => {
        setIsForgotUsernameAndPassword(true);
        openDialog();
    }

    const handleUserChange = (e) => {
        setUserName(e.target.value.replace(/\s+/g, '').toLowerCase());
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (isForgotUsernameAndPassword) {
                forgotUsernameAndPassword(email);
            }
            else {
                register(username, password, email);
            }
        }
    }

    const isValidEmail = (email) => {
        if (email !== "" && email.includes("@")) {
            return true;
        }
        return false;
    }

    const register = async (username, password, email) => {
        if (username !== "" && password !== "") {
            if (isValidEmail(email)) {
                setResStatus("");
                setResMessage("");
                setIsLoading(true);
                const response = await fetchRegisterUser(username, password, email);
                if (response) {
                    setResStatus(response.status);
                    setResMessage(response.message);
                }
                else {
                    setResStatus("error");
                    setResMessage("Service Unavailable");
                }
                setUserName("");
                setPassword("");
                setEmail("");
                setIsLoading(false);
            }
            else {
                setResStatus("error");
                setResMessage("Please enter a valid email address");
            }
        }
        else {
            setResStatus("error");
            setResMessage("Missing username or password");
        }
    }

    const forgotUsernameAndPassword = async (email) => {
        if (isValidEmail(email)) {
            setResStatus("");
            setResMessage("");
            setIsLoading(true);
            const response = await fetchForgotUsernameAndPassword(email);
            if (response) {
                setResStatus(response.status);
                setResMessage(response.message);
            }
            else {
                setResStatus("error");
                setResMessage("Service Unavailable");
            }
            setEmail("");
            setIsLoading(false);
        }
        else {
            setResStatus("error");
            setResMessage("Please enter a valid email address");
        }
    }

    return (
        <>
            <Dialog onClose={closeDialog} open={dialog} fullWidth>
                <DialogTitle sx={{ display: "inline-block", margin: "auto" }}>
                    <AutoAwesome />{isForgotUsernameAndPassword ? "Account Recovery" : "Register"}<AutoAwesome />
                </DialogTitle>
                <DialogContent>
                    <FormControl variant="standard" fullWidth>
                        {!isForgotUsernameAndPassword ?
                            <>
                                <TextField sx={{ width: "100%", marginTop: 1 }} label="Username" variant="outlined"
                                    value={username}
                                    onChange={(e) => handleUserChange(e)}
                                    onKeyDown={_handleKeyDown}
                                />
                                <TextField sx={{ width: "100%", marginTop: 1 }} label="Password" variant="outlined"
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e)}
                                    onKeyDown={_handleKeyDown}
                                    type="password"
                                />
                            </>
                            : null
                        }
                        <TextField sx={{ width: "100%", marginTop: 1 }} label="Email" variant="outlined"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            onKeyDown={_handleKeyDown}
                            type="email"
                        />
                        <Button sx={{ width: "100%", marginTop: 1 }} type="button" color="primary" variant="contained"
                            onClick={() => isForgotUsernameAndPassword ? forgotUsernameAndPassword(email) : register(username, password, email)}>
                            Submit
                        </Button>
                        <Alert sx={{ marginTop: 1 }} severity={resStatus}>{resMessage}</Alert>
                        {isLoading ? <CircularProgress sx={{ marginTop: 1, margin: "auto", padding: "1rem", display: "block" }} /> : null}
                    </FormControl>
                </DialogContent>
            </Dialog>
            <Button sx={{ width: "20rem", marginTop: 1, backgroundColor: "#1976d2" }} type="button" color="primary" variant="contained"
                onClick={openDialog}>
                Register
            </Button>
            <Typography className="pointer" sx={{ display: "block", margin: "auto", marginTop: 4, fontSize: "1rem", color: "#1976d2", width: "15rem" }}
                onClick={handleForgotUsernameAndPassword}
            >
                Forgot Username or Password?
            </Typography>
        </>
    )
}

export default Register;