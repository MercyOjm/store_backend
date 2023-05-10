import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function FormikLogin() {

    const handleSubmit = async (values, {setSubmitting, setStatus}) => {
        try {
            const response = await axios({
                method: 'post', url: 'http://localhost:5000/users/signin',
                data: values,
                withCredentials: true
            });

            console.log('response.data: ', response.data);

        } catch (error) {
            // if (error.response.status === 400) {
            //     setStatus(error.response.data.errors)
            // }

            if (error.response.status === 401) {
                setStatus(error.response.data.message)
            }
        }
        setSubmitting(false);
    }



    // sechema for validation
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message:'Invalid Password'})
    });


  return (
      <div className='container-formik'>
          <Formik
              initialValues={{email:'', password:''}}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
              
          >
              {(formikBag) => (
                  <Form>
                      <div className='form-elems'>
                          <label htmlFor="email">Email</label>
                          <Field type="email" name="email" />
                          <ErrorMessage name="email" component="div" className='error'/>
                      </div>
                      <div className='form-elems'>
                          <label htmlFor="password">Password</label>
                          <Field type="password" name="password" />
                          <ErrorMessage name="password" component="div" className='error'/>
                      </div>
                      <button type="submit" disabled={formikBag.isSubmitting} className='login-btn formik-btn'>SignIn</button>
                  
                      <div className="status-errors">
                          <div className='error'>{ formikBag.status}</div>
                        </div>
                  </Form>

              )}
          </Formik>
    </div>
  )
}

export default FormikLogin