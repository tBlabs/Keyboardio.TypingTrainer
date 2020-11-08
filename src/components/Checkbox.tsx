import * as React from "react";

interface Props
{
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}

interface State
{
    value: boolean;
}

export class Checkbox extends React.Component<Props, State>
{

    constructor(props: Props)
    {
        super(props);

        this.state = { value: props.value };
    }

    private onChange(value: boolean): void
    {
        this.setState({ value });

        this.props.onChange(value);
    };

    render()
    {
        return (
            <div>
                <label className="main" style={{color: this.props.disabled ? "#333" : "#666"}}>{this.props.label}
                    <input
                        disabled={this.props.disabled}
                        type="checkbox"
                        checked={this.state.value}
                        onChange={(e) => this.onChange(e.target.checked)}
                    />
                    <span className="geekmark"></span>
                </label>
            </div>);
    }
}