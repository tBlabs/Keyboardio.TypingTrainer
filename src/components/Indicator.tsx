import * as React from 'react';
import '../HtmlStyles/Indicator.css';

interface IProps
{
    label: string;
    value: string;
    unit?: string;
}

interface IState
{

}

export class Indicator extends React.Component<IProps, IState>
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
        const { label, value, unit } = this.props;

        return (
            <div className="indicator-box">
                    <span className="label">{label}</span>
                    <span className="value">{value}</span>
                    <span className="unit">{unit}</span>
            </div>
        );
    }
}