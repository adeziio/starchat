import React from 'react';
import { Typography, Button, Tooltip } from '@mui/material';
import { LinkedIn, GitHub, Instagram, Email } from '@mui/icons-material';

const Footer = () => {
    return (
        <>
            <Typography variant="body2" color="text.secondary" fontSize="1rem" sx={{ display: "block", backgroundColor: "#1976d2", color: "white" }}>
                © 2022 Created by Aden Tran.
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="1rem" sx={{ display: "block", backgroundColor: "#1976d2", color: "white" }}>
                <Typography variant="body2" color="text.secondary" fontSize="1rem" sx={{ display: "inline-block" }}>
                    <Tooltip title="GitHub">
                        <Button sx={{ m: 0, p: 0, minWidth: "2rem" }} onClick={() => window.open("https://github.com/adeziio")}>
                            <GitHub sx={{ color: "white" }} />
                        </Button>
                    </Tooltip>
                </Typography>

                <Typography variant="body2" color="text.secondary" fontSize="1rem" sx={{ display: "inline-block" }}>
                    <Tooltip title="LinkedIn">
                        <Button sx={{ m: 0, p: 0, minWidth: "2rem" }} onClick={() => window.open("https://www.linkedin.com/in/aden-tran-aba695171")}>
                            <LinkedIn sx={{ color: "white" }} />
                        </Button>
                    </Tooltip>
                </Typography>

                <Typography variant="body2" color="text.secondary" fontSize="1rem" sx={{ display: "inline-block" }}>
                    <Tooltip title="Instagram">
                        <Button sx={{ m: 0, p: 0, minWidth: "2rem" }} onClick={() => window.open("https://www.instagram.com/adeziio")}>
                            <Instagram sx={{ color: "white" }} />
                        </Button>
                    </Tooltip>
                </Typography>

                <Typography variant="body2" color="text.secondary" fontSize="1rem" sx={{ display: "inline-block" }}>
                    <Tooltip title="Email">
                        <Button sx={{ m: 0, p: 0, minWidth: "2rem" }} onClick={() => window.open("mailto:adeziio@yahoo.com")}>
                            <Email sx={{ color: "white" }} />
                        </Button>
                    </Tooltip>
                </Typography>
            </Typography>
        </>
    )
}

export default Footer;