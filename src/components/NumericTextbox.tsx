import * as React from 'react';
import './../HtmlStyles/NumericTextbox.css';

interface Props
{
    label: string;
    unit: string;
    value: number;
    onChange: (value: number) => void;
}

interface State
{
    value: number;
}

export class NumericTextbox extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { value: this.props.value || 0 };
    }

    private onChange(value: number): void
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
                    onChange={(e) => this.onChange(+e.target.value)}
                    value={this.state.value}
                />
                <span className="unit">{this.props.unit}</span>
            </div>
        );
    }
}