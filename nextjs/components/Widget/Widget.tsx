import React from 'react';

import s from './Widget.module.scss';
import classNames from 'classnames';
import {v4 as uuidv4} from "uuid";

interface WidgetProps {
    title: React.ReactNode,
    className: string,
    children: React.ReactNode[] | React.ReactNode,
    options: object,
    headerClass: string
}

class Widget extends React.Component<WidgetProps> {

    static defaultProps = {
        title: null,
        className: '',
        headerClass: '',
        children: [],
        options: {},
    }

    constructor(props: WidgetProps) {
        super(props);

        this.state = {
            randomId: uuidv4(),
        }
    }

    render() {
        const {
            title,
            className,
            headerClass,
            children,
            options,
            ...attributes
        } = this.props;

        return (
            <React.Fragment>
                <section
                    className={s.widget}
                    {...attributes}
                >
                    {title && (
                        <div className={classNames(headerClass, s.title)}>
                            {title}
                        </div>)}
                    <div className={className}>
                        {children}
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Widget;
