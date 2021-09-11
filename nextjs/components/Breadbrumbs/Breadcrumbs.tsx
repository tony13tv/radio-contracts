import React from "react";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {withTranslation, WithTranslation} from "react-i18next";
import {v4 as uuidv4} from "uuid";
import s from "./Breadcrumbs.module.scss";
import Link from "next/link";

interface BreadcrumbsProps extends WithTranslation {
    url: string
}

class Breadcrumbs extends React.Component<BreadcrumbsProps> {

    renderBreadcrumbs = () => {
        let url = this.props.url;
        let route = this.props.url.split('/')
            .slice(1)
            .map(route => route
                .split('-')
                .map(word => word.length < 3
                    ? word.toUpperCase()
                    : word[0].toUpperCase() + word.slice(1))
                .join(' ')
            );
        const length = route.length

        return route.map((item, index) => {
            let middlewareUrl = "/" + url.split("/").slice(1, index + 2).join("/");

            return (
                <BreadcrumbItem key={uuidv4()}>
                    {length === index + 1
                        ? this.props.t(item)
                        : <Link href={middlewareUrl}>
                            {this.props.t(item)}
                        </Link>
                    }
                </BreadcrumbItem>
            )
        })
    }

    render() {

        const {url, t} = this.props;
        let routeArr = url.split('/');
        let title = routeArr[routeArr.length - 1];
        let breadcrumbTitle = title[0].toUpperCase() + title.slice(1)

        return (
            <div className={s.breadcrumbs}>
                <div className="headline-2">{t(breadcrumbTitle)}</div>
                {breadcrumbTitle !== "Dashboard" &&
                <Breadcrumb tag="nav" listTag="div">
                    {this.renderBreadcrumbs()}
                </Breadcrumb>
                }
            </div>
        )
    }
}

export default withTranslation()(Breadcrumbs);
