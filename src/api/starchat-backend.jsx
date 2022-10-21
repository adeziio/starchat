import Cookies from 'js-cookie';

export const fetchRegisterUser = async (create_date, username, password, email) => {
    try {
        const res = await fetch("/registerUser", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
                "create_date": create_date,
                "username": username,
                "password": password,
                "email": email
            })
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchLogin = async (username, password) => {
    try {
        const res = await fetch("/login", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
                "username": username,
                "password": password
            })
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchLogout = async () => {
    try {
        const res = await fetch("/logout", {
            "method": "GET",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            }
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchUser = async () => {
    try {
        const res = await fetch("/api/user", {
            "method": "GET",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            }
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchForgotUsernameAndPassword = async (email) => {
    try {
        const res = await fetch("/forgotUsernameAndPassword", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
                "email": email
            })
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchViewRooms = async () => {
    try {
        const res = await fetch("/api/viewRooms", {
            "method": "GET",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            }
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchAddRoom = async (roomname) => {
    try {
        const res = await fetch("/api/addRoom", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
                "roomname": roomname
            })
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}


export const fetchViewMessages = async (roomname) => {
    try {
        const res = await fetch("/api/viewMessages", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
                "roomname": roomname
            })
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const fetchAddMessage = async (roomname, message) => {
    try {
        const res = await fetch("/api/addMessage", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
                "roomname": roomname,
                "message": message
            })
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}