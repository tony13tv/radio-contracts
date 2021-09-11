import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Button, Col, Container, FormGroup, FormText, Input, Row,} from "reactstrap";
import Widget from "../components/Widget/Widget";
import Footer from "../components/Footer/Footer";

import loginImage from "../assets/registerImage.svg";
import SofiaLogo from "../components/Icons/SidebarIcons/SofiaLogo";
import GoogleIcon from "../components/Icons/AuthIcons/GoogleIcon";
import TwitterIcon from "../components/Icons/AuthIcons/TwitterIcon";
import FacebookIcon from "../components/Icons/AuthIcons/FacebookIcon";
import GithubIcon from "../components/Icons/AuthIcons/GithubIcon";
import LinkedinIcon from "../components/Icons/AuthIcons/LinkedinIcon";
import {registerUser} from "../actions/register";
import {useAppDispatch, useAppSelector} from "../reducers";
import {useRouter} from "next/router";
import Link from "next/link";

function Register() {
    const dispatch = useAppDispatch()
    const {isFetching, isAuthenticated, errorMessage} = useAppSelector(state => ({
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    }))
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({...state, email: event.target.value}));
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({...state, password: event.target.value}));
    }

    const doRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser({
            creds: {
                email: state.email,
                password: state.password,
            },
            history: router
        }));
    }

    const {from} = router.query || {from: {pathname: '/app'}};

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
                                <p className="auth-header mb-0">Sign Up</p>
                                <div className="logo-block">
                                    <SofiaLogo/>
                                    <p className="mb-0">SOFIA</p>
                                </div>
                            </div>
                            <div className="auth-info my-2">
                                <p>This is a real app with Node.js backend - use <b>"admin@flatlogic.com /
                                    password"</b> to login!</p>
                            </div>
                            <form onSubmit={doRegister}>
                                <FormGroup className="my-3">
                                    <FormText>Email</FormText>
                                    <Input id="email" className="input-transparent pl-3" value={state.email}
                                           onChange={changeEmail} type="email" required name="email"
                                           placeholder="Henry Monk"/>
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <div className="d-flex justify-content-between">
                                        <FormText>Password</FormText>
                                        <Link href="/error">Forgot password?</Link>
                                    </div>
                                    <Input id="password" className="input-transparent pl-3"
                                           value={state.password} onChange={changePassword}
                                           type="password" required name="password"
                                           placeholder="Place your password here"/>
                                </FormGroup>
                                <div className="bg-widget d-flex justify-content-center">
                                    <Button className="rounded-pill my-3" type="submit" color="secondary-red">Sign
                                        Up</Button>
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
                                <Link href="/login">Enter the account</Link>
                            </form>
                        </Widget>
                    </Col>
                    <Col xs={0} lg={6} className="right-column">
                        <div>
                            <img src={loginImage.src} alt="Error page"/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Register;
