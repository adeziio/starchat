import React from 'react';

const ChatRoom = () => {
    const rooms = ["room 1", "room 2", "room 3", "room 4", "room 5"];
    return (
        <>
            {rooms.map((row, index) => {
                return (
                    <div key={`${row}-${index}`}>
                        {row}
                    </div>
                )
            })}
        </>
    )
}

export default ChatRoom;