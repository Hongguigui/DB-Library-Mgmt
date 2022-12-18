import { useState, useEffect } from 'react'
import axios from "axios";
import {Button} from "react-bootstrap";

function Profile(prop) {

  const [profileData, setProfileData] = useState(null)
  function getData() {
    axios({
      method: "GET",
      url:"http://localhost:5000/profile",
      headers: {
        Authorization: 'Bearer ' + prop.token
      }
    })
    .then((response) => {
      const res =response.data
      res.access_token && prop.setToken(res.access_token)
      setProfileData(({
        UID: res.UID,
        borrowed: res.borrowed}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  useEffect(() => {
    getData();
    console.log("Profile loaded.");
  }, [""]);

  return (
      <div className="Profile">
          <h3>User Profile</h3>
          <p>UID: {profileData.UID}</p>
          <p>Book borrowed: {profileData.borrowed}</p>
          <Button class="btn btn-info" type="submit" variant="outline-primary" size="lg">Borrowed books</Button>
      </div>
  );
}

export default Profile;