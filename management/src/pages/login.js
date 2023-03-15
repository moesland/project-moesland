import { useState } from "react";
import { BackendClientRequest } from "../services/ApiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (elem) => {
        elem.preventDefault();
        
        const url = "/api/auth";
        const body = {username, password}
        const headers = new Headers({
            'Content-Type':'application/json'
        })
        const method = "POST"

        const data = await BackendClientRequest(url, body, headers, method);
        if(data && data.authToken) {
            localStorage.setItem('token', data.authToken.token);
            navigate('/', {replace: true});
        }
    }   

    const handleChange = (elem) => {
        const inputName = elem.target.name;
        const inputValue = elem.target.value;

        switch(inputName){
            case "username":
                setUsername(inputValue)
                break;
            case "password":
                setPassword(inputValue)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>)
}

export default Login;