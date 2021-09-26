import React, {Dispatch, useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import s from "./Sidebar.module.scss";
import LinksGroup, {ChildrenLink} from "./LinksGroup/LinksGroup";
import {changeActiveSidebarItem} from "../../actions/navigation";
import {logout} from "../../actions/auth";
import HomeIcon from "../Icons/SidebarIcons/HomeIcon";
import TablesIcon from "../Icons/SidebarIcons/TablesIcon";
import RDSRadioLogo from "../Icons/SidebarIcons/RDSRadioLogo.png";
import {useAppDispatch, useAppSelector} from "../../reducers";
import {v4 as uuidv4} from "uuid";

interface SidebarProps {
    sidebarOpened?: boolean,
    activeItem?: string
}

interface SidebarActionProps {
    dispatch: Dispatch<any>,
    location: {
        pathname: string,
    }
}

function Sidebar() {
    const dispatch = useAppDispatch()
    const {sidebarOpened, activeItem} = useAppSelector((store) => ({
        sidebarOpened: store.navigation.sidebarOpened,
        activeItem: store.navigation.activeItem,
    }))

    const element = useRef(null)
    const firstRender = useRef(sidebarOpened) // ugly fix for useEffect executing the firstRender event with deps

    typeof window !== 'undefined' && useLayoutEffect(() => {
        firstRender.current = sidebarOpened
        element.current.addEventListener('transitionend', () => {
            if (sidebarOpened) {
                element.current.classList.add(s.sidebarOpen);
            }
        }, false);
    }, [])

    useEffect(() => {
        if (firstRender.current !== sidebarOpened)
            if (sidebarOpened) {
                element.current.style.height = `276px`;
            } else {
                element.current.classList.remove(s.sidebarOpen);
                setTimeout(() => {
                    element.current.style.height = '0px';
                }, 0);
            }
    }, [sidebarOpened])

    const doLogout = (id: bigint) => {
        dispatch(logout());
    }

    const links: ChildrenLink[] = [
        {
            header: 'Contratos', link: '#',
            childrenLinks: [
                {header: 'Contratos', link: '/contracts/contracts'},
                {header: 'Plantillas', link: '/contracts/templates'},
                {header: 'Cláusulas', link: '/contracts/clauses'},
            ]
        },
        {
            header: 'Cotizaciones', link: '#',
            childrenLinks: [
                {header: 'Cotizaciones', link: '/quotations/quotations'},
            ]
        },
        {
            header: 'Clientes', link: '#',
            childrenLinks: [
                {header: 'Agencias', link: '/customers/agencies'},
                {header: 'Marcas', link: '/customers/brands'},
            ]
        },
        {
            header: 'Seguridad', link: '#',
            childrenLinks: [
                {header: 'Usuarios', link: '/security/users'},
                {header: 'Grupos', link: '/security/groups'}
            ]
        }
    ]
    return (
        <nav className={s.root} ref={element}>
            <header className={s.logo}>
                <img src={RDSRadioLogo.src} alt="RDS Radio" width={40} height={40}/>
                <span className={s.title}>RDS RADIO</span>
            </header>
            <ul className={s.nav}>
                <LinksGroup
                    onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
                    activeItem={activeItem}
                    header="Dashboard"
                    isHeader
                    iconName={<HomeIcon className={s.sidebarIcon}/>}
                    link="/dashboard"
                    index="dashboard"
                    badge="9"
                />
                {links.map((link, pos) => <React.Fragment key={uuidv4()}>
                    <li><h5 className={[s.navTitle, s.groupTitle].join(" ")}>{link.header}</h5></li>
                    {link.childrenLinks?.map(link => <LinksGroup
                        onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={activeItem}
                        header={link.header}
                        isHeader
                        iconName={<TablesIcon/>}
                        link={link.link}
                        index="typography"
                    />)}
                </React.Fragment>)}
            </ul>
        </nav>
    )
}

export default Sidebar;
