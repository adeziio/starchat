import React, { useState, useEffect, useRef } from 'react';
import {
    Button, Alert, TextField, CircularProgress, Grid, TableContainer,
    Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Typography
} from '@mui/material';
import { ArrowBack, ArrowCircleRight } from '@mui/icons-material';
import { fetchViewRooms, fetchAddRoom, fetchViewMessages, fetchAddMessage } from './../../api/starchat-backend';
import Message from './Message';

const ChatRoom = (props) => {
    const { username } = props;
    const [roomname, setRoomName] = useState("");
    const [roomData, setRoomData] = useState([]);
    const [roomDataSize, setRoomDataSize] = useState(0);
    const [roomDataPerPage, setRoomDataPerPage] = useState([]);
    const [messageData, setMessageData] = useState([]);
    const [resStatus, setResStatus] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [input, setInput] = useState("");
    const pageSize = 4;
    const ref = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchViewRooms();
            if (response) {
                setRoomData(response.data);
                setRoomDataSize(response.size);
                setRoomDataPerPage(response.data.slice(0, pageSize));
            }
            else {
                setRoomData([]);
                setRoomDataSize(0);
                setRoomDataPerPage([]);
            }
        }
        fetchData();

        const timer = setInterval(() => roomname !== "" ? viewMessages(roomname) : null, 5000)
        return () => clearTimeout(timer)
    }, [roomname])

    const viewRooms = async () => {
        const response = await fetchViewRooms();
        if (response) {
            setRoomData(response.data);
            setRoomDataSize(response.size);
            setRoomDataPerPage(response.data.slice(0, pageSize));
        }
        else {
            setRoomData([]);
            setRoomDataSize(0);
            setRoomDataPerPage([]);
        }
    }

    const addRoom = async () => {
        setResStatus("");
        setResMessage("");
        setIsLoading(true);
        const response = await fetchAddRoom(input);
        if (response) {
            setResStatus(response.status);
            setResMessage(response.message);
            viewRooms();
        }
        else {
            setResStatus("error");
            setResMessage("Service Unavailable");
        }
        setInput("");
        setIsLoading(false);
    }

    const viewMessages = async (roomname) => {
        const response = await fetchViewMessages(roomname);
        if (response) {
            setMessageData(response.data);
        }
        else {
            setMessageData([]);
        }
    }

    const addMessage = async () => {
        setResStatus("");
        setResMessage("");
        setIsLoading(true);
        const response = await fetchAddMessage(roomname, input);
        if (response) {
            setResStatus("");
            setResMessage("");
            viewMessages(roomname);
        }
        else {
            setResStatus("error");
            setResMessage("Service Unavailable");
        }
        setInput("");
        setIsLoading(false);
        ref.current.scrollTop = ref.current.scrollHeight;
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = () => {
        if (roomname === "") {
            addRoom();
        }
        else {
            addMessage();
        }
    }

    const handlePageChange = (e, value) => {
        e.preventDefault();
        setPage(value);
        setRoomDataPerPage(roomData.slice((value - 1) * pageSize, ((value - 1) * pageSize) + pageSize));
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    }

    const handleRoomSelect = (roomname) => {
        setRoomName(roomname);
        viewMessages(roomname);
        setInput("");
        setResStatus("");
        setResMessage("");
        ref.current.scrollTop = ref.current.scrollHeight;
    }

    const handleBackSelect = () => {
        setRoomName("");
        viewRooms();
        setInput("");
        setResStatus("");
        setResMessage("");
    }

    return (
        <>
            {roomname === "" ?
                <>
                    <Grid spacing={1} columns={16} m={1}>
                        <Grid item xs={12} display="inline-block">
                            <TextField
                                value={input}
                                sx={{ marginTop: "-1rem", maxWidth: "11rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}
                                label="Room Name"
                                variant="outlined"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid item xs={4} display="inline-block">
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ height: "3.5rem" }}
                                onClick={handleSubmit}
                            >
                                Create New Room
                            </Button>
                        </Grid>
                    </Grid>
                    {resStatus === "error" ? <Alert sx={{ marginTop: 1 }} severity={resStatus}>{resMessage}</Alert> : null}
                    {isLoading ? <CircularProgress sx={{ display: "block", marginTop: 1, margin: "auto", padding: "1rem" }} /> : null}
                    <Pagination
                        rowsperpage={pageSize} count={Math.ceil(roomDataSize / pageSize)} size="large" color="primary"
                        sx={{ display: "inline-block", margin: "auto", marginTop: 5 }}
                        showFirstButton showLastButton
                        page={page} onChange={handlePageChange}
                    />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" width="15%">Create Date</TableCell>
                                    <TableCell align="center" width="50%">Room</TableCell>
                                    <TableCell align="left" width="15%">Created By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {roomDataPerPage.length > 0 ?
                                    roomDataPerPage.map((row, index) => {
                                        return (
                                            <TableRow
                                                key={`chat-${row.create_date}-${row.room_name}-${index}`}
                                                hover
                                                className='pointer'
                                                onClick={() => handleRoomSelect(row.room_name)}
                                            >
                                                <TableCell align="right">{row.create_date.split(" ")[0]}</TableCell>
                                                <TableCell align="center">{row.room_name}</TableCell>
                                                <TableCell align="left">{row.created_by}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                :
                <>
                    <Grid container sx={{ height: "100%" }}>
                        <Grid item xs={2}>
                            <Typography className="pointer" sx={{ float: "right" }} onClick={handleBackSelect}>
                                <ArrowBack sx={{ fontSize: "2rem" }} />
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography sx={{ display: "block" }}>{roomname}</Typography>
                            <Typography sx={{ height: "25rem", overflow: "auto" }} ref={ref}>
                                {messageData.length > 0 ?
                                    messageData.map((row, index) => {
                                        return (
                                            <Message
                                                key={`${row.user_name}-${index}`}
                                                position={row.user_name === username ? "right" : "left"}
                                                username={row.user_name}
                                                message={row.message}
                                            />
                                        )
                                    })
                                    : null
                                }
                            </Typography>
                            <TextField
                                fullWidth
                                value={input}
                                sx={{ display: "inline-block", marginTop: "1rem" }}
                                label="Message"
                                variant="outlined"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        <Grid item xs={2} sx={{ position: "relative" }}>
                            <ArrowCircleRight
                                className='pointer'
                                sx={{ color: "#1976d2", fontSize: "4rem", position: "absolute", left: 0, bottom: 0 }}
                                onClick={handleSubmit}
                            />
                        </Grid>
                    </Grid>

                </>
            }
        </>
    )
}

export default ChatRoom;