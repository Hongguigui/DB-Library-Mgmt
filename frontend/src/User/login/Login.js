// Reference: https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
// Edited by Xiao Lin
import { useState } from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";
import Alert from 'react-s-alert-v3';

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"http://localhost:5000/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
        console.log(response);
        Alert.success("Login successful!");
      }).catch((error) => {
        if (error.response) {
          Alert.error("Login failed!");
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) {
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange}
                  type="email"
                  text={loginForm.email}
                  name="email"
                  placeholder="Email"
                  value={loginForm.email} />
            <input onChange={handleChange}
                  type="password"
                  text={loginForm.password}
                  name="password"
                  placeholder="Password"
                  value={loginForm.password} />

          <Button type="submit" variant="primary" onClick={logMeIn}>Submit</Button>
        </form>
      </div>
    );
}

export default Login;