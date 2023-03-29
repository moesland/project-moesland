import { useState } from "react";
import { BackendClientRequest } from "../services/ApiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
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
        else{
            setErrors(validateForm(false));
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

    const validateForm = (req) => {
        let errors = {};
        let login = req;

        if(!login){
            errors.login = "Foutieve inloggegevens";
        }
        if (username.length < 2 || username.length > 15) {
            errors.username = "Gebruikersnaam bestaat uit 2 t/m 15 tekens.";
        }
        if(password.length < 6){
            errors.password = "Wachtwoord bestaat uit minimaal 6 tekens."
        }
        
        return errors;
    }

    return (
        <>      
            <div className="container">
                <div className="h-100 d-flex align-items-center justify-content-center">           
                    <form onSubmit={handleSubmit} className="col-3">
                        <div className="text-center">
                            <h1>Inloggen</h1>
                        </div>          
                        {errors.login && <div className="text-danger fw-bold text-center">{errors.login}</div>}    
                        <div className="form-group mt-3">         
                            <label className="mb-2">
                                Gebruikersnaam:
                            </label>
                            <input type="text" name="username" value={username} onChange={handleChange} className="form-control"/> 
                            {errors.username && <div className="text-danger">{errors.username}</div>}                                                       
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Wachtwoord:
                            </label>
                            <input type="password" name="password" value={password} onChange={handleChange} className="form-control"/>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <br></br>
                        <div className="form-group text-center">                            
                            <input type="submit" value="Inloggen" className="btn btn-success"/>
                        </div>
                    </form>
                </div>
                </div>
        </>)
}

export default Login;