import * as React from 'react';
import './../HtmlStyles/Button.css';

interface Props
{
    label: string;
    onClick: () => void;
    class: string;
}

export class Button extends React.Component<Props, {}>
{
    render()
    {
        return (
            <button className={this.props.class ? "button " + this.props.class : "button"} onClick={() => this.props.onClick()} >
                {this.props.label}
            </button>
        );
    }
}