import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import s from "./Breadcrumbs.module.scss";
import Link from "next/link";

function Breadcrumbs({ url }) {
    const { t } = useTranslation()

    function renderBreadcrumbs() {
        let route = url.split('/')
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
                        ? t(item)
                        : <Link href={middlewareUrl}>
                            {t(item)}
                        </Link>
                    }
                </BreadcrumbItem>
            )
        })
    }

    let routeArr = url.split('/');
    let title = routeArr[routeArr.length - 1];
    if(!title) return null;
    let breadcrumbTitle = title[0].toUpperCase() + title.slice(1)

    return (
        <div className={s.breadcrumbs}>
            <div className="headline-2">{t(breadcrumbTitle)}</div>
            {breadcrumbTitle !== "Dashboard" &&
            <Breadcrumb tag="nav" listTag="div">
                {renderBreadcrumbs()}
            </Breadcrumb>
            }
        </div>
    )
}

export default Breadcrumbs;
