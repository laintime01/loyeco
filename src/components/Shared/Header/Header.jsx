import { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import img from '../../../images/logo2.png';
import img2 from '../../../images/doc/doctor 3.jpg';
import { Button, Popover, message } from 'antd';
import { loggedOut } from '../../../service/auth.service';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaBars } from "react-icons/fa";


const Header = () => {
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [show, setShow] = useState(true);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsLoggedIn(authChecked);
    }, [authChecked]);

    const handleSignOut = () => {
        loggedOut();
        message.success("Successfully Logged Out");
        setIsLoggedIn(false);
    };

    const content = (
        <div className='nav-popover'>
            <div className='my-2'>
                <h5 className='text-capitalize'>{data?.firstName + ' ' + data?.lastName}</h5>
                <p className='my-0'>{data?.email}</p>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <Button type="ghost" className='w-100' size="small" onClick={handleSignOut}>
                Log Out
            </Button>
        </div>
    );

    return (
        <>
            <div className={`navbar navbar-expand-lg navbar-light ${!show && "hideTopHeader"}`} expand="lg">
                <TopHeader />
            </div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className={`${!show && "stickyHeader"}`}>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={img} alt="" className="img-fluid" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mobile-nav-toggle">
                        <FaBars />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav  id="navbar" className="navbar order-last order-lg-0">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link>Contact</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
