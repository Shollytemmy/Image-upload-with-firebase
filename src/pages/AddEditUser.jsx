import {useEffect, useState} from 'react'
import { Button, Form, Grid, Loader } from 'semantic-ui-react'
import {storage, db} from "../firebase"
import { useParams, useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


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

  const navigate = useNavigate()


  useEffect(() => {

    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name)
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        switch(snapshot.state){
          case "paused":
            console.log("Uploding is pause")
            break;
            case "running":
              console.log("Uploding is running")
              break;
          default:
          break;
        }
      }, (error) => {
        console.log(error);
      },
      () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setData((prev) => ({...prev, img: downloadUrl}))

        })
      }
      )


    }

    file && uploadFile()

  }, [file])


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

    return errors
  }

  const handleSbmit = async(e) => {
    e.preventDefault()

    let errors = validate()

    if(Object.keys(errors).length) return setErrors(errors)

    setIsSubmitting(true)
    await addDoc(collection(db, "users"), {
      ...data,
      timestamp: serverTimestamp()
    })

    navigate("/")


    
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
                 error={errors.name ? {content: errors.name} : null}
                  name='name'
                   placeholder='Enter your Name'
                   onChange={handleChange}
                   value={name}
                   autofofus
                   />

                   <Form.Input
                 label='Email'
                 error={errors.email ? {content: errors.email} : null}
                  name='email'
                   placeholder='Enter your email'
                   onChange={handleChange}
                   value={email}
                   />

                   <Form.TextArea
                 label='Info'
                 error={errors.info ? {content: errors.info} : null}
                  name='info'
                   placeholder='Enter info'
                   onChange={handleChange}
                   value={info}
                   
                   />

                   <Form.Input
                 label='Contact'
                 error={errors.contact ? {content: errors.contact} : null}
                  name='contact'
                   placeholder='Enter contact'
                   onChange={handleChange}
                   value={contact}
                   />

                   <Form.Input
                   type='file'
                   onChange={(e) => setFile(e.target.files[0])}
                     />

                 <Button
                  type='submit'
                   primary 
                   disabled={progress !== null && progress < 100}
                   >
                    Submit
                   </Button>
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
