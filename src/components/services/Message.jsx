import React from 'react';
import { Typography } from '@mui/material';

const Message = (props) => {
    const { position, username, message } = props;

    return (
        <>
            {position === "left" ?
                <Typography variant="body2" fontSize="1rem"
                    sx={{
                        clear: "both", float: "left", display: "block", color: "black", marginTop: "1rem", marginBottom: "1rem"
                    }}
                >
                    <Typography variant="span" color="black" fontSize="1rem"
                    >
                        {`${username}`}
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
                        clear: "both", float: "right", display: "block", bcolor: "black", marginTop: "1rem", marginBottom: "1rem"
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
                        {`${username}`}
                    </Typography>
                </Typography>
                : null
            }
        </>
    )
}

export default Message;