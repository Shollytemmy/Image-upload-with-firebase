import {useState, useEffect} from 'react'
import {db} from "../firebase"
import {Button, Grid, Container, Card, Image, CardGroup} from "semantic-ui-react"
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import ModalComp from '../components/ModalComp'
import { async } from '@firebase/util'


const Home = () => {
  const [users, setUsers] = useState([])
    const [client, setClient] = useState([])
      const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const unRegistered = onSnapshot(collection(db, "users"), (snapshot) => {
      let lists = [];

      snapshot.docs.forEach((docs) => {
        lists.push({id: docs.id, ...docs.data()})
        
      })

      setUsers(lists)
      // console.log(lists)
      setLoading(false)
    }, (error) => {
      console.log(error);
    }
    )

    return () => {
      unRegistered()
    }
  }, [])

  const handleModal = (user) => {
    console.log(user)
      setOpen(true)
      setClient(user)

    }

    const handleDelete = async(id) => {
      if(window.confirm("Are you sure you want to delete this contact")){
        try {
          setOpen(false)
          await deleteDoc(doc(db, "users", id))
          setUsers(users.filter((user) => user.id !== id))
          
        } catch (error) {
          console.log(error)
          
        }

      }
    }

  return (
    <Container>
      
        <Grid stackable columns={3}>

          {users && users.map((user) => (
            
            <Grid.Column key={user.id}>
              <Card>
                <Card.Content>
                  <Image
                  src={user.img}
                  size="medium"
                  style={{height: '150px', width: '150px', borderRadius: "50%"}}  
                  />
                  <Card.Header style={{marginTop: "10px"}}>
                    {user.name}

                  </Card.Header>
                  <Card.Description>{user.info}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <Button color='green' onClick={() => navigate(`/update/${user.id}`)}>Update</Button>
                    <Button color='purple' onClick={() => handleModal(user)}>View</Button>
                    {open && 
                    <ModalComp
                    open={open}
                    setOpen={setOpen}
                    img={user.img}
                    name={user.name}
                    contact={user.contact}
                    email={user.email}
                    info={user.info}
                    id={user.id}
                    handleDelete={handleDelete}
                      />
                    }
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}

        </Grid>
      
      
    </Container>
  )
}

export default Home
