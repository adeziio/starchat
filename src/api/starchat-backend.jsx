import Cookies from 'js-cookie';

export const fetchRegisterUser = async (username, password, email) => {
    try {
        const res = await fetch("/registerUser", {
            "method": "POST",
            "credentials": "include",
            "headers": {
                'Content-Type': 'application/json',
                'x-csrf-token': Cookies.get("csrf_access_token")
            },
            "body": JSON.stringify({
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

export const fetchViewAllRoom = async () => {
    try {
        const res = await fetch("/api/viewAllRoom", {
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


export const fetchViewMessage = async (roomname) => {
    try {
        const res = await fetch("/api/viewAllRoom", {
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