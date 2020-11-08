import * as React from 'react';
import './../HtmlStyles/NumericTextbox.css';

interface Props
{
    label: string;
    value: string;
    onChange: (value: string) => void;
}

interface State
{
    value: string;
}

export class Textbox extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { value: this.props.value || "" };
    }

    private onChange(value: string): void
    {
        this.setState({ value: value });
        this.props.onChange(value);
    };

    render()
    {
        return (
            <div className="input-box">
                <span className="label">{this.props.label}</span>
                <input type="number"
                    className="input"
                    onChange={(e) => this.onChange(e.target.value)}
                    value={this.state.value}
                />
            </div>
        );
    }
}