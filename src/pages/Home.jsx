import {useState, useEffect} from 'react'
import {db} from "../firebase"
import {Button, Grid, Container, Card, Image, CardGroup} from "semantic-ui-react"
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'


const Home = () => {
  const [users, setUsers] = useState([])
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

  return (
    <Container>
      <Card.Group>
        <Grid columns={3} stackable>

          {users && users.map((user) => (
            <Grid.Column>
              <Card key={user.id}>
                <Card.Content>
                  <Image
                  src={user.img}
                  size="medium"
                  style={{height: '150px', width: '150px', borderRadius: "50%"}}  
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}

        </Grid>
      </Card.Group>
      
    </Container>
  )
}

export default Home
