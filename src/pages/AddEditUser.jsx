import React, {useEffect, useState} from 'react'
import { Button, Form, Grid, Loader } from 'semantic-ui-react'
import {storage} from "../firebase"
import { useParams, useNavigation } from 'react-router-dom'

const initialState = {
    name: "",
    email: "",
    info: "",
    contact: ""
  }

const AddEditUser = () => {
  const [data, setData] = useState(initialState)
  const {name, email, info, contact} = data
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const validate = () => {
    let errors = {}


    if(!name){
      errors.name ="Name field is required"
    }

    if(!email){
      errors.email ="Email field is required"
    }

    if(!name){
      errors.name ="Name field is required"
    }

    if(!info){
      errors.info ="Info field is required"
    }

    if(!contact){
      errors.contact ="Contact field is required"
    }
  }

  const handleSbmit = (e) => {
    e.preventDefault()

    let error = validate()
  }

  
  return (
    <div>
      <Grid centered verticalAlign='middle' columns="3" style={{height: "80vh"}}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <div>
              {isSubmitting ? (<Loader active inline="centered" size='huge'  />
              ) 
              :
              <>
              <h2>Add User</h2>
              <Form onSubmit={handleSbmit}>
                <Form.Input
                 label='Name'
                  name='name'
                   placeholder='Enter your Name'
                   onChange={handleChange}
                   value={name}
                   autofofus
                   />

                   <Form.Input
                 label='Email'
                  name='email'
                   placeholder='Enter your email'
                   onChange={handleChange}
                   value={email}
                   />

                   <Form.TextArea
                 label='Info'
                  name='info'
                   placeholder='Enter info'
                   onChange={handleChange}
                   value={info}
                   
                   />

                   <Form.Input
                 label='Contact'
                  name='contact'
                   placeholder='Enter contact'
                   onChange={handleChange}
                   value={contact}
                   />

                   <Form.Input
                   type='file'
                   onChange={(e) => setFile(e.target.files[0])}
                     />

                 
              </Form>
              </>
              }
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </div>
  )
}

export default AddEditUser
