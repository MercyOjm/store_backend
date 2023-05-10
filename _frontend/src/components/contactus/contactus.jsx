import React from 'react';
import axios from 'axios';

function Contactus() {

    const [user, setUser] = React.useState({ email: '', message: '' });
    const [errors, setErrors] = React.useState([]);

    const changeHandler = function (e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = async function (e) {
        e.preventDefault();
        setErrors([]);

        try {
            //send req to backend
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/users/messagefromcustomers',
                data: user,
                
            });

            if (response.status === 200) {
                alert(response.data.message)
            }

            console.log(response);
        } catch (err) {

            console.log(err);
        }
    }
  return (
      <div className='container-contact'>
          <form className='form' onSubmit={submitHandler} onChange={changeHandler}>
              <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" className='form-control'/>
              </div>
              <div>
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" cols="30" rows="3"></textarea>
              </div>
              <input type="submit" value="Send" />
          </form>
    </div>
  )
}

export default Contactus