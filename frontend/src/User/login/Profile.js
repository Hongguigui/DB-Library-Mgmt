// Reference: https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7
// Edited by Xiao Lin
import { useState, useEffect } from 'react'
import axios from "axios";
import {Button, Table} from "react-bootstrap";

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
        email: res.email,
        fine: res.fine,
        borrowedNum: res.borrowedNum
      }))
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
          {profileData && <div>
              <Table striped='vertical' bordered hover>
                <tbody>
                  <tr>
                    <th>UID</th>
                    <th>{profileData.UID}</th>
                  </tr>
                  <tr>
                    <td>User email</td>
                    <td>{profileData.email}</td>
                  </tr>
                  <tr>
                    <td>Current fine</td>
                    <td>${profileData.fine}</td>
                  </tr>
                  <tr>
                    <td>Borrowed book count</td>
                    <td>{profileData.borrowedNum}</td>
                  </tr>
                  <tr>
                    <td>Borrowed book list</td>
                    <td><Button class="btn btn-info" type="submit" variant="info">Borrowed books</Button></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          }
      </div>
  );
}

export default Profile;