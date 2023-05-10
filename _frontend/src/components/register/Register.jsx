import React from 'react';
import axios from 'axios';

function Register() {

    const [user, setUser] = React.useState({ name: '', birthdate: '', email: '', password: '' });
    const [picture, setPicture] = React.useState();


    const handleChange = function (e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const fileChange = function (e) {
        setPicture(e.target.files[0]);
        console.log(picture);
    }


    const submitHandler = async function (e) {
        e.preventDefault();
        
        try {
            const fd = new FormData();
            fd.append('name', user.name);
            fd.append('birthdate', user.birthdate);
            fd.append('email', user.email);
            fd.append('password', user.password);
            fd.append('picture', picture)

            
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/users/signup',
                data: fd,
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });

            console.log(response);


        } catch (error) {
            console.error(error.response);
        }


    }

  return (
      <div className='register-container'>
          <h3>Register Here!</h3>
          <form className='register-form' onSubmit={submitHandler}>
              <div className="form-elem">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" className="form-control" onChange={handleChange} value={user.name}/>
              </div>
              <div className="form-elem">
                  <label htmlFor="birthdate">Birthdate</label>
                  <input type="date" name="birthdate" id="birthdate" className="form-control" onChange={handleChange} value={user.birthdate}/>
              </div>
              <div className="form-elem">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" className="form-control" onChange={handleChange} value={user.email}/>
              </div>
              <div className="form-elem">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" className="form-control" onChange={handleChange} value={user.password}/>
              </div>
              <div className="form-elem">
                  <label htmlFor="picture">Profile Picture</label>
                  <input type="file" name="picture" id="picture" className="form-control" onChange={fileChange}/>
              </div>

              <input type="submit" value="Register" className='register-btn' />
          </form>
    </div>
  )
}

export default Register;