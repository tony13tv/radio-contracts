import React, {useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import Link from "next/link";
import {Badge, Collapse} from "reactstrap";
import {Route} from "react-router";
import classnames from "classnames";

import s from "./LinksGroup.module.scss";
import {useAppSelector} from "../../../reducers";
import {useRouter} from "next/router";
import {v4 as uuidv4} from "uuid";

function NavLink({to, exact, children, activeClassName, ...props}) {
    const {pathname} = useRouter()
    const isActive = exact ? pathname === to : pathname.startsWith(to)

    if (isActive) props.className += activeClassName

    return <Link href={to}>
        <a {...props}>
            {children}
        </a>
    </Link>
}

export interface ChildrenLink {
    header: string,
    link: string,
    index?: string,
    childrenLinks?: ChildrenLink[],
}

interface LinksGroupProps extends RouteComponentProps {
    header: React.ReactNode,
    link: string,
    childrenLinks?: ChildrenLink[],
    iconName?: object,
    className?: string,
    badge?: string,
    label?: string,
    activeItem?: string,
    isHeader?: boolean,
    index?: string,
    deep?: number,
    onActiveSidebarItemChange?: (activeItem: any) => void,
    labelColor?: string,
    exact?: boolean,
    target?: string,
}

interface LinksGroupState {
    headerLinkWasClicked: boolean,
}

function LinksGroup({onActiveSidebarItemChange, index, ...props}) {
    const [state, setState] = useState({
        headerLinkWasClicked: true,
    })

    const {sidebarOpened, activeItem} = useAppSelector(store => ({
        sidebarOpened: store.navigation.sidebarOpened,
        activeItem: store.navigation.activeItem,
    }))

    const togglePanelCollapse = (link: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation()
        onActiveSidebarItemChange?.(link);
        setState({
            ...state,
            headerLinkWasClicked: !state.headerLinkWasClicked ||
                !!(activeItem && !activeItem.includes(index as string)),
        });
    }

    const isOpen = (props.activeItem &&
        props.activeItem.includes(props.index as string) &&
        this.state.headerLinkWasClicked) as boolean;

    const {exact} = props;

    if (!props.childrenLinks) {
        if (props.isHeader) {
            const {link, target, labelColor} = props;
            return (
                <li className={[s.headerLink, props.className].join(" ")}>
                    <NavLink to={link} activeClassName={s.headerLinkActive} exact={exact} target={target}>
                        <span className={s.icon}>{props.iconName}</span>
                        {props.header}
                        {props.label && <sup className={`${s.headerLabel} text-${labelColor || 'warning'}`}>
                            {props.label}
                        </sup>}
                        {props.badge &&
                        <Badge className={s.badge} color="secondary-red" pill>{props.badge}</Badge>}
                    </NavLink>
                </li>
            );
        }
        return (
            <li>
                <NavLink
                    to={props.link}
                    activeClassName={s.headerLinkActive}
                    onClick={(e) => {
                        if (props.link.includes('menu')) {
                            e.preventDefault();
                        }
                    }}
                    exact={exact}>
                    <i className="fa fa-circle text-primary mr-2"/> {props.header}
                </NavLink>
            </li>
        );
    }
    const {childrenLinks, labelColor} = props
    return (
        <Route
            path={props.link}
            children={(params) => {
                const {match} = params;
                return (
                    <li className={classnames({[s.headerLink]: props.isHeader}, props.className)}>
                        <a className={classnames(s.accordionToggle, {[s.headerLinkActive]: match}, {[s.collapsed]: isOpen}, "d-flex")}
                           style={{paddingLeft: `${props.deep && 35 + 10 * (props.deep - 1)}px` || 16}}
                           onClick={(e) => this.togglePanelCollapse(props.link, e)}>
                            {props.isHeader && <span className={s.icon}>{props.iconName}</span>}
                            {props.header}
                            {props.label &&
                            <sup className={`${s.headerLabel} text-${labelColor || "warning"} ml-1`}>
                                {props.label}
                            </sup>}
                            <b className={["fa fa-angle-right", s.caret].join(" ")}/>
                        </a>
                        <Collapse className={s.panel} isOpen={isOpen}>
                            <ul>
                                {childrenLinks && childrenLinks.map((child: ChildrenLink, ind) =>
                                    <LinksGroup
                                        onActiveSidebarItemChange={props.onActiveSidebarItemChange}
                                        activeItem={props.activeItem}
                                        header={child.header}
                                        link={child.link}
                                        index={child.index}
                                        childrenLinks={child.childrenLinks}
                                        deep={(props.deep as number) + 1}
                                        key={ind || uuidv4()} history={props.history}
                                        location={props.location} match={props.match}/>,
                                )}
                            </ul>
                        </Collapse>
                    </li>
                );
            }}
        />);

}

export default LinksGroup;
