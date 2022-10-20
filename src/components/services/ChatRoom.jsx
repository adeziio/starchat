import React, { useState, useEffect } from 'react';
import { Button, Alert, TextField, CircularProgress, Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { fetchViewAllRoom, fetchAddRoom } from './../../api/starchat-backend';

const ChatRoom = () => {
    const [data, setData] = useState([]);
    const [dataSize, setDataSize] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [resStatus, setResStatus] = useState("");
    const [resMessage, setResMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [input, setInput] = useState("");
    const pageSize = 10;

    useEffect(() => {
        const fetchData = async () => {
            setResStatus("");
            setResMessage("");
            setIsLoading(true);
            const response = await fetchViewAllRoom();
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

    const viewAllRoom = async () => {
        setResStatus("");
        setResMessage("");
        setIsLoading(true);
        const response = await fetchViewAllRoom();
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
            viewAllRoom();
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

    const handlePageChange = (value) => {
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
            <Grid spacing={1} columns={16} >
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
                            <TableCell align="left">Create Date</TableCell>
                            <TableCell align="left">Room Name</TableCell>
                            <TableCell align="left">Created By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageData.length > 0 ?
                            pageData.map((row, index) => {
                                return (
                                    <TableRow
                                        key={`chat-${row.create_date}-${row.room_name}-${index}`}
                                        hover
                                    >
                                        <TableCell align="left">{row.create_date.split(" ")[0]}</TableCell>
                                        <TableCell align="left">{row.room_name}</TableCell>
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
    )
}

export default ChatRoom;