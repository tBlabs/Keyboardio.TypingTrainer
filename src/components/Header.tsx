import * as React from 'react';
import '../HtmlStyles/Header.css';

interface IProps
{
    text: string;
}

export class Header extends React.Component<IProps, {}>
{
    constructor(props: any)
    {
        super(props);

    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div className="header">
                {this.props.text}
                {/* <hr /> */}
            </div>
        );
    }
}