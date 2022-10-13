import Cookies from 'js-cookie';
const host = process.env.REACT_APP_BACKEND_HOST;

export const fetchRegisterUser = async (username, password, email) => {
    try {
        const res = await fetch(host + "/registerUser", {
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
        const res = await fetch(host + "/login", {
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

export const fetchLogout = async (username, password) => {
    try {
        const res = await fetch(host + "/logout", {
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
        const res = await fetch(host + "/api/user", {
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


