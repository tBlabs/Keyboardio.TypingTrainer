import * as React from "react";
import * as uuid from "uuid";
import './../HtmlStyles/Combobox.css';

export interface SelectOption
{
    Text: string;
    Value: string;
}

interface Props
{
    label: string;
    value: string;
    onChange: (value: string) => void;
    values: SelectOption[];
}

interface State
{
    value: string;
}

export class Combobox extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = { value: props.values.find(x => x.Value === this.props.value)?.Value || "" };
    }

    private onChange(value: string): void
    {
        this.setState({ value });

        this.props.onChange(value);
    };

    render()
    {
        return (
            <div className="input-box">
                <span className="label">{this.props.label}</span>

                <select onChange={(e) => this.onChange(e.target.value)}
                    value={this.state.value}
                >
                    {this.props.values.map(x =>
                        <option key={uuid.v4()}
                            value={x.Value}
                            className="list-option"
                        >
                            {x.Text}
                        </option>
                    )}
                </select>
            </div>);
    }
}