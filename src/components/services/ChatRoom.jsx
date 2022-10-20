import React, { useState, useEffect } from 'react';
import {
    Button, Alert, TextField, CircularProgress, Grid, TableContainer,
    Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchViewRooms, fetchAddRoom } from './../../api/starchat-backend';

const ChatRoom = () => {
    const [data, setData] = useState([]);
    const [dataSize, setDataSize] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [resStatus, setResStatus] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [input, setInput] = useState("");
    const pageSize = 5;

    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setResStatus("");
            setResMessage("");
            setIsLoading(true);
            const response = await fetchViewRooms();
            if (response) {
                setData(response.data);
                setDataSize(response.size);
                setPageData(response.data.slice(0, pageSize));
                setResStatus("");
                setResMessage(response.message);
            }
            else {
                setData([]);
                setDataSize(0);
                setPageData([]);
                setResStatus("error");
                setResMessage("Service Unavailable");
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    const viewRooms = async () => {
        setResStatus("");
        setResMessage("");
        setIsLoading(true);
        const response = await fetchViewRooms();
        if (response) {
            setData(response.data);
            setDataSize(response.size);
            setPageData(response.data.slice(0, pageSize));
            setResStatus("");
            setResMessage(response.message);
        }
        else {
            setData([]);
            setDataSize(0);
            setPageData([]);
            setResStatus("error");
            setResMessage("Service Unavailable");
        }
        setIsLoading(false);
    }

    const addRoom = async () => {
        setResStatus("");
        setResMessage("");
        setIsLoading(true);
        const response = await fetchAddRoom(input);
        if (response) {
            setResStatus("");
            setResMessage("");
            viewRooms();
        }
        else {
            setResStatus("error");
            setResMessage("Service Unavailable");
        }
        setIsLoading(false);
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = () => {
        addRoom();
    }

    const handlePageChange = (e, value) => {
        e.preventDefault();
        setPage(value);
        setPageData(data.slice((value - 1) * pageSize, ((value - 1) * pageSize) + pageSize));
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    }

    return (
        <>
            {roomName === "" ?
                <>
                    <Grid spacing={1} columns={16} m={1}>
                        <Grid item xs={12} display="inline-block">
                            <TextField
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
                        rowsperpage={pageSize} count={Math.ceil(dataSize / pageSize)} size="large" color="primary"
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
                            <TableBody>
                                {pageData.length > 0 ?
                                    pageData.map((row, index) => {
                                        return (
                                            <TableRow
                                                key={`chat-${row.create_date}-${row.room_name}-${index}`}
                                                hover
                                                className='pointer'
                                                onClick={() => setRoomName(row.room_name)}
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
                    <Grid container spacing={1} m={1}>
                        <Grid item xs={4} sx={{ border: '1px dashed grey' }}>
                            <Typography className="pointer" sx={{ float: "right" }} onClick={() => setRoomName("")} >
                                <ArrowBack sx={{ fontSize: "2rem" }} />
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ border: '1px dashed grey' }}>
                            {roomName}
                        </Grid>
                        <Grid item xs={4} sx={{ border: '1px dashed grey' }}>

                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}

export default ChatRoom;