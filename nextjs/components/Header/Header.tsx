import React, { useState } from "react";
import { shallowEqual } from "react-redux";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Nav,
    Navbar,
    NavItem,
    NavLink,
} from "reactstrap";

import { logout } from "../../actions/auth";
import { closeSidebar, openSidebar } from "../../actions/navigation";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon";
import BellIcon from "../Icons/HeaderIcons/BellIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import basketIcon from "../../assets/navbarMenus/basketIcon.svg";
import calendarIcon from "../../assets/navbarMenus/calendarIcon.svg";
import envelopeIcon from "../../assets/navbarMenus/envelopeIcon.svg";
import mariaImage from "../../assets/navbarMenus/mariaImage.jpg";
import notificationImage from "../../assets/navbarMenus/notificationImage.jpg";
import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "../../reducers";
import { RouteComponentProps } from "react-router-dom";

interface HeaderProps {
    me: { fullName: string },
    sidebarOpened: boolean,
    sidebarStatic: boolean,
}

interface HeaderActionProps extends RouteComponentProps {
    dispatch: AppDispatch,
}

interface HeaderState {
    menuOpen: boolean,
    notificationsOpen: boolean,
    searchFocused: boolean
}

function Header() {
    const [ state, setState ] = useState({
        menuOpen: false,
        notificationsOpen: false,
        searchFocused: false
    })

    const dispatch = useAppDispatch()

    const { me, sidebarOpened, sidebarStatic } = useAppSelector((store: RootState) => ({
        me: store.auth.me,
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
    }), shallowEqual);

    const doLogout = () => {
        dispatch(logout());
    }

    const toggleSidebar = () => {
        if (sidebarOpened) {
            dispatch(closeSidebar());
        } else {
            const paths = window.location.pathname.split('/');
            paths.pop();
            dispatch(openSidebar());
        }
    }

    const toggleMenu = () => {
        setState({
            ...state,
            menuOpen: !state.menuOpen,
        });
    }

    const toggleNotifications = () => {
        setState({
            ...state,
            notificationsOpen: !state.notificationsOpen,
        });
    }

    return (
        <Navbar className={`${s.root} d-print-none`}>
            <div>
                <NavLink onClick={toggleSidebar} className={`d-md-none mr-3 nav-item`} href="#">
                    <MenuIcon className={s.menuIcon}/>
                </NavLink>
            </div>
            <Form className="d-none d-sm-block" inline>
                <FormGroup>
                    <InputGroup className='input-group-no-border'>
                        <Input id="search-input" placeholder="Search Dashboard" className='focus'/>
                        <InputGroupAddon addonType="prepend">
                            <span>
                              <SearchBarIcon/>
                            </span>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
            <Nav className="ml-auto">
                <NavItem className="d-sm-none mr-4">
                    <NavLink className="" href="#">
                        <SearchIcon/>
                    </NavLink>
                </NavItem>
                <Dropdown nav isOpen={state.menuOpen} toggle={toggleMenu}
                          className="tutorial-dropdown mr-2 mr-sm-3">
                    <DropdownToggle nav>
                        <div className={s.navbarBlock}>
                            <BellIcon maskId={114}/>
                            <div className={s.count}/>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu right className="navbar-dropdown notifications-dropdown" style={{ width: "340px" }}>
                        <DropdownItem><img src={basketIcon.src}
                                           alt="Basket Icon"/><span>12 new orders have arrived today</span></DropdownItem>
                        <DropdownItem>
                            <div>
                                <div className="d-flex flex-row mb-1">
                                    <img src={mariaImage.src} alt="Maria" className={s.mariaImage}/>
                                    <div className="d-flex flex-column">
                                        <p className="body-3">Maria</p>
                                        <p className="label muted">15 min ago</p>
                                    </div>
                                </div>
                                <img src={notificationImage.src} alt="Notification Icon"
                                     className={s.notificationImage}/>
                                <p className="body-2 muted">It is just a simple image that can define th..</p>
                            </div>
                        </DropdownItem>
                        <DropdownItem><img src={calendarIcon.src} alt="Calendar Icon"/><span>1 event has been canceled and ..</span></DropdownItem>
                        <DropdownItem><img src={envelopeIcon.src}
                                           alt="Envelope Icon"/><span>you have 2 new messages</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={state.notificationsOpen} toggle={toggleNotifications} nav
                          id="basic-nav-dropdown" className="ml-3">
                    <DropdownToggle nav caret className="navbar-dropdown-toggle">
                        <span className={`${s.avatar} rounded-circle float-left mr-2`}>
                            <img src={me.avatar?.src} alt="User"/>
                        </span>
                        <span className="small d-none d-sm-block ml-1 mr-2 body-1">{me?.name ?? '...'}</span>
                    </DropdownToggle>
                    <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
                        <DropdownItem
                            className={s.dropdownProfileItem}><ProfileIcon/><span>Profile</span></DropdownItem>
                        <DropdownItem
                            className={s.dropdownProfileItem}><TasksIcon/><span>Tasks</span></DropdownItem>
                        <DropdownItem
                            className={s.dropdownProfileItem}><MessagesIcon/><span>Messages</span></DropdownItem>
                        <NavItem>
                            <NavLink onClick={doLogout} href="#">
                                <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit">
                                    <img src={logoutIcon.src} alt="Logout"/><span className="ml-1">Logout</span>
                                </button>
                            </NavLink>
                        </NavItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        </Navbar>
    )
}

export default Header;

