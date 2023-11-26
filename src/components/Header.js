import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import {BsSearch} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { MovieContext } from "./MyContext";

function Header() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');
  const api_key = "474226313b15cb8eb2da7d23a4b6d38d";
  const movieContext = useContext(MovieContext)

  const handleChange = (e) => {
    let inputVal = e.target.value
    setSearchValue(inputVal)
  }



  const handleSearch = (e) => {
      e.preventDefault()
      axios.get("https://api.themoviedb.org/3/search/movie",
      {
        params:{
          query:searchValue,
          api_key : api_key
        }
      })
      .then( res => {
        //console.log(res.data.results)
        movieContext.getData(res.data.results)
      })
      .catch(err => console.log(err))
      navigate("/search-results")
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch(e)
  }


  return (
    <>
        <Navbar bg="dark"  key="lg" expand="lg" className="">
          <Container fluid>
            <Navbar.Brand className="text-light" href="/">CBMovie</Navbar.Brand>
            <Navbar.Toggle className="bg-light" aria-controls={`offcanvasNavbar-expand-lg `} />
            <Navbar.Offcanvas
              className="bg-dark text-light"
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg}`}
              placement="start"
            >
              <Offcanvas.Header   closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                CBMovie
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* <Nav.Link className="text-light" href="/">Home</Nav.Link> */}
                  {/* <NavDropdown
                    className="bg-dark text-light"
                    title="Account"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item className="" href="#action3">Login</NavDropdown.Item>
                    <NavDropdown.Item className="" href="#action4">
                      Sign up
                    </NavDropdown.Item>
                    <NavDropdown.Item className="" href="#action5">
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                <Form onSubmit={handleSearch} className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search movies..."
                    className="me-2"
                    aria-label="Search"
                    onChange={handleChange}
                    onKeyDown={handleKey}
                  />
                  <Button type="submit" className="text-light bg-primary" >
                    <BsSearch/>
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

    </>
  );
}

export default Header;
