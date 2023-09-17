import React from 'react'
import {Menu, Container, Button, Image} from "semantic-ui-react"
import { useNavigate, Link } from 'react-router-dom'
import logo from "../assets/react.svg"
const Navbar = () => {
    const navigate = useNavigate()

    const styles = {
        padding: "0.3rem",
        marginBottom: "20px"

    }
  return (
    <Menu inverted style={styles} attached> 
        <Container>
            <Menu.Item name='home'>
                <Link to="/">
                    <Image src={logo} alt="logo"  size='mini' />
                </Link>
            </Menu.Item>
            <Menu.Item>
                <h2>React CRUD Operation with Firebase</h2>
            </Menu.Item>
            <Menu.Item position='right'>
                <Button primary size='mini' onClick={() => navigate("/add")} >Add user</Button>
            </Menu.Item>
            
        </Container>
      
    </Menu>
  )
}

export default Navbar
