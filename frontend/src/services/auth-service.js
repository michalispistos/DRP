const AuthService = {
    async register(username, email, password, firstname, lastname, bio, degree, degree_level, skills) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password,
                firstname,
                lastname,
                bio,
                degree,
                degree_level,
                skills,
            }),
        }
        return await fetch(`${process.env.REACT_APP_SERVER}/auth/signup`, requestOptions).then(async res => {
            const ok = res.ok;
            let data;
            try {
                data = await res.json();
            } catch (err) {
                console.log(err);
            }
            return {ok, data};
        });
    },

    async login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
        };
        return await fetch(`${process.env.REACT_APP_SERVER}/auth/signin`, requestOptions).then(async res => {
            const ok = res.ok;
            const data = await res.json();
            if (data.accessToken) {
                localStorage.setItem('user', JSON.stringify(data));
            }
            return {ok, data};
        }).catch(err => console.log(err));
    },

    logout() {
        localStorage.removeItem('user');
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
}

export default AuthService;