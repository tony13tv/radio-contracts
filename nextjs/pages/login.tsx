import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import Link from 'next/link'
import {Button, Col, Container, FormGroup, FormText, Input, Row,} from "reactstrap";
import Widget from "../components/Widget/Widget";
import Footer from "../components/Footer/Footer";
import {login} from "../actions/auth";
import {useAppDispatch, useAppSelector} from "../reducers";

import loginImage from "../assets/loginImage.svg";
import SofiaLogo from "../components/Icons/SidebarIcons/SofiaLogo";
import GoogleIcon from "../components/Icons/AuthIcons/GoogleIcon";
import TwitterIcon from "../components/Icons/AuthIcons/TwitterIcon";
import FacebookIcon from "../components/Icons/AuthIcons/FacebookIcon";
import GithubIcon from "../components/Icons/AuthIcons/GithubIcon";
import LinkedinIcon from "../components/Icons/AuthIcons/LinkedinIcon";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../components/queries";

function Login() {
    const dispatch = useAppDispatch()
    const [login] = useMutation(LOGIN)

    const {isFetching, isAuthenticated, errorMessage} = useAppSelector(store => ({
        isFetching: store.auth.isFetching,
        isAuthenticated: store.auth.isAuthenticated,
        errorMessage: store.auth.errorMessage,
    }))

    const [state, setState] = useState({
        email: 'admin@flatlogic.com',
        password: 'password',
    })

    // function isAuthenticated(token: string) {
    //     if (token) return true;
    // }

    const doLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login({variables: {username: state.email, password: state.password}}).then(({data}) => {
            console.log(data)
            typeof window !== 'undefined' && localStorage.setItem('jwt', data?.login?.jwt)
        })
        // dispatch(login({username: state.email, password: state.password}));
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, email: event.target.value});
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, password: event.target.value});
    }

    const from = (typeof window !== 'undefined' && window.location.pathname) || '/dashboard'

    if (isAuthenticated) {
        return (
            <Redirect to={from}/>
        );
    }

    return (
        <div className="auth-page">
            <Container className="col-12">
                <Row className="d-flex align-items-center">
                    <Col xs={12} lg={6} className="left-column">
                        <Widget className="widget-auth widget-p-lg">
                            <div className="d-flex align-items-center justify-content-between py-3">
                                <p className="auth-header mb-0">Login</p>
                                <div className="logo-block">
                                    <SofiaLogo/>
                                    <p className="mb-0">RDS RADIO</p>
                                </div>
                            </div>
                            <div className="auth-info my-2">
                                {errorMessage ||
                                <p>This is a real app with Node.js backend - use <b>"admin@flatlogic.com /
                                    password"</b> to login!</p>}
                            </div>
                            <form onSubmit={doLogin}>
                                <FormGroup className="my-3">
                                    <FormText>Email</FormText>
                                    <Input id="email" className="input-transparent pl-3" value={state.email}
                                           onChange={changeEmail} type="email" required name="email"
                                           placeholder="Email"/>
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <div className="d-flex justify-content-between">
                                        <FormText>Password</FormText>
                                        <Link href="/error">Forgot password?</Link>
                                    </div>
                                    <Input id="password" className="input-transparent pl-3"
                                           value={state.password} onChange={changePassword}
                                           type="password" required name="password" placeholder="Password"/>
                                </FormGroup>
                                <div className="bg-widget d-flex justify-content-center">
                                    <Button className="rounded-pill my-3" type="submit"
                                            color="secondary-red">Login</Button>
                                </div>
                                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                                <div className="d-flex align-items-center my-3">
                                    <p className="social-label mb-0">Login with</p>
                                    <div className="socials">
                                        <a href="https://flatlogic.com/"><GoogleIcon/></a>
                                        <a href="https://flatlogic.com/"><TwitterIcon/></a>
                                        <a href="https://flatlogic.com/"><FacebookIcon/></a>
                                        <a href="https://flatlogic.com/"><GithubIcon/></a>
                                        <a href="https://flatlogic.com/"><LinkedinIcon/></a>
                                    </div>
                                </div>
                                <Link href="/register">Don’t have an account? Sign Up here</Link>
                            </form>
                        </Widget>
                    </Col>
                    <Col xs={0} lg={6} className="right-column">
                        <div>
                            <img {...loginImage}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Login;
