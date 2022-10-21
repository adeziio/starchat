import React from 'react';
import { Typography } from '@mui/material';

const Message = (props) => {
    const { position, create_date, username, message } = props;

    const convertDateTime = (date) => {
        const now = new Date(date);
        const ampm = now.getHours() >= 12 ? 'pm' : 'am';
        const hours = now.getHours() % 12 ? now.getHours() % 12 : 12;
        const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        return `${hours}:${minutes} ${ampm}`;
    }

    return (
        <>
            {position === "left" ?
                <Typography variant="body2" fontSize="1rem"
                    sx={{
                        clear: "both", float: "left", display: "block", color: "black", marginTop: "1rem", marginBottom: "1rem",
                    }}
                >
                    <Typography variant="span" color="black" fontSize="1rem"
                    >
                        {`${username} `}
                        <Typography variant="span" color="black" fontSize="1rem"
                            sx={{ opacity: "0.7", fontSize: "0.8rem", marginLeft: "0.2rem" }}
                        >
                            {`${convertDateTime(create_date)}`}
                        </Typography>
                    </Typography>

                    <Typography variant="span" color="text.secondary" fontSize="1rem"
                        sx={{
                            backgroundColor: "#1976d2", color: "white", marginLeft: "1rem",
                            padding: "5px", borderRadius: "25px"
                        }}
                    >
                        {`${message}`}
                    </Typography>
                </Typography>
                : null
            }
            {position === "right" ?
                <Typography variant="body2" fontSize="1rem"
                    sx={{
                        clear: "both", float: "right", display: "block", bcolor: "black", marginTop: "1rem", marginBottom: "1rem",
                    }}
                >
                    <Typography variant="span" color="text.secondary" fontSize="1rem"
                        sx={{
                            backgroundColor: "#1976d2", color: "white", marginRight: "1rem",
                            padding: "5px", borderRadius: "25px"
                        }}
                    >
                        {`${message}`}
                    </Typography>
                    <Typography variant="span" color="black" fontSize="1rem"
                    >
                        <Typography variant="span" color="black" fontSize="1rem"
                            sx={{ opacity: "0.7", fontSize: "0.8rem", marginRight: "0.5rem" }}
                        >
                            {`${convertDateTime(create_date)}`}
                        </Typography>
                        {`${username}`}
                    </Typography>
                </Typography>
                : null
            }
        </>
    )
}

export default Message;