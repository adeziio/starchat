import React, { useState } from 'react';
import { Alert, Dialog, DialogTitle, DialogContent, Button, TextField, CircularProgress } from '@mui/material';
import { fetchRegisterUser } from '../../api/starchat-backend';

const Register = () => {
    const [dialog, setDialog] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [resStatus, setResStatus] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toggleDialog = () => {
        setDialog(prevDialog => !prevDialog);
        setUserName("");
        setPassword("");
        setResStatus("");
        setResMessage("");
        setIsLoading(false);
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
            register(username, password, email);
        }
    }

    const register = async (username, password, email) => {
        if (username !== "" && password !== "" && email !== "") {
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
            setIsLoading(false);
        }
    }

    return (
        <>
            <Dialog onClose={toggleDialog} open={dialog}>
                <DialogTitle>Register User</DialogTitle>
                <DialogContent>
                    <TextField sx={{ width: "20rem", marginTop: 1 }} label="Username" variant="outlined"
                        onChange={(e) => handleUserChange(e)}
                        onKeyDown={_handleKeyDown}
                    />
                    <TextField sx={{ width: "20rem", marginTop: 1 }} label="Password" variant="outlined"
                        onChange={(e) => handlePasswordChange(e)}
                        onKeyDown={_handleKeyDown}
                        type="password"
                    />
                    <TextField sx={{ width: "20rem", marginTop: 1 }} label="Email" variant="outlined"
                        onChange={(e) => handleEmailChange(e)}
                        onKeyDown={_handleKeyDown}
                        type="email"
                    />
                    <Button sx={{ width: "20rem", marginTop: 1 }} type="button" color="primary" variant="contained" onClick={() => register(username, password, email)}>
                        Submit
                    </Button>
                    <Alert sx={{ marginTop: 1 }} severity={resStatus}>{resMessage}</Alert>
                    {isLoading ? <CircularProgress sx={{ marginTop: 1, margin: "auto", padding: "1rem" }} /> : null}
                </DialogContent>
            </Dialog>
            <Button sx={{ width: "20rem", marginTop: 1 }} type="button" color="primary" variant="contained" onClick={toggleDialog}>
                Register
            </Button>
        </>
    )
}

export default Register;