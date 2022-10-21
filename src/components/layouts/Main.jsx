import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatRoom from './../services/ChatRoom';
import Login from '../services/Login';
import { fetchUser } from './../../api/starchat-backend';

const Main = (props) => {
    const [username, setUserName] = useState("");
    const [page, setPage] = useState(props.page);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchUser();
            if (response) {
                setUserName(response.username);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='header-container'>
                <Header
                    username={username}
                    setUserName={setUserName}
                    page={page}
                    setPage={setPage}
                />
            </div>

            <div className='content-container'>
                {username !== "" ?
                    page === "Chat Room" ? <ChatRoom username={username} />
                        : null
                    : <Login setUserName={setUserName} />
                }
            </div>

            <div className='footer-container'>
                <Footer />
            </div>
        </>
    )
}

export default Main;