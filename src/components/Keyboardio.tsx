import * as React from 'react';
import { WORDS } from './Words';
import '../HtmlStyles/Keyboardio.css';
import { Checkbox } from './Checkbox';

interface IState
{
    charset: string;
    charsetInfo: string;
    input: string;
    text: string;
    info: string;
    titlecaseSometimes: boolean;
    multiplyWords: boolean;
}

export class Keyboardio extends React.Component<{}, IState>
{
    state = {
        charset: window.localStorage.getItem("charset") || "qwertyuiopasdfghjklzxcvbnm", 
        charsetInfo: "",
        input: "Loading...", 
        text: "", 
        info: "", 
        titlecaseSometimes: false, 
        multiplyWords: false
    };

    private words: string[] = [];

    ShuffleArray(array: string[]): string[]
    {
        for (let i = array.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private Generate(charset: string)
    {
        let words: string[] = WORDS;

        if (charset !== "qwertyuiopasdfghjklzxcvbnm")
        {
            const selectedChars = charset.split("");
            const allChars = "qwertyuiopasdfghjklzxcvbnm".split("");
            const invertedSet = allChars.filter(x => !selectedChars.includes(x));
            invertedSet.forEach(l => words = words.filter(x => !x.includes(l)));
        }

        this.words = words;

        return this.words.length;
    }

    componentDidMount()
    {
        const foundWords = this.Generate(this.state.charset);

        this.setState({ input: this.Next, charsetInfo: `${foundWords} words found` });
    }

    private ToTiltlecase(str: string)
    {
        if (str.length <= 1) return str;

        return str[0].toUpperCase() + str.substr(1, str.length);
    }

    private get Next()
    {
        let shuffled = this.ShuffleArray(this.words);
        if (this.state.titlecaseSometimes)
        {
            shuffled = shuffled.map(x =>
            {
                if (Math.random() * 10 > 7)
                    return this.ToTiltlecase(x);
                else return x;
            });
        }
        if (this.state.multiplyWords)
        {
            let temp: string[] = [];
            shuffled.forEach(x =>
            {
                temp.push(x);
                temp.push(x);
            });
            shuffled = [...temp];
        }
        let t = shuffled.join(" ");
        t = [...Array(5).keys()].map(x => t).join(". ");
        return t.substr(0, 80).trim();
    }

    private mistakes = 0;
    private pressesSoFar = 0;
    private UserInput_KeyPress(str: string): void
    {
        this.pressesSoFar += 1;

        let inf = "";
        if (!this.state.input.startsWith(str))
        {
            this.mistakes += 1;
            inf = `YOU MADE A MISTAKE! ${this.mistakes} of ${this.pressesSoFar} chars pressed so far (${((this.mistakes / this.pressesSoFar) * 100).toFixed(0)}%)`;
            this.setState({ info: inf });
            return;
        }
        else
        {
            if (str.length >= this.state.input.length)
            {
                this.setState({ text: "", input: this.Next });
            }
            else
                this.setState({ text: str, info: "" });
        }
    }

    private async CharsetTextbox_Change(str: string)
    {

        const foundWords = this.Generate(str);

        await this.SetStateAsync({ charset: str, input: this.Next, text: "", info: "", charsetInfo: `${foundWords} words found` });

        window.localStorage.setItem("charset", this.state.charset);
    }

    private async Reload(updater: Partial<IState>): Promise<void>
    {
        await this.SetStateAsync(updater);
        await this.SetStateAsync({ input: this.Next });
    }

    private async SetStateAsync(updater: Partial<IState>): Promise<void>
    {
        return new Promise(resolve =>
        {
            this.setState(updater, () => resolve());
        });
    }

    render()
    {
        return (
            <div style={{ padding: "32px" }} >
                <input readOnly className="big-input" type="text" value={this.state.input} /><br />
                <input className="big-input" type="text" value={this.state.text} onChange={(k) => this.UserInput_KeyPress(k.target.value)} />
                <div style={{ height: "30px" }}>
                    <p>{this.state.info}</p>
                </div>
                <br />
                <br />
                <br />
                <br />
                <input type="text" className="small-input"
                    value={this.state.charset}
                    onChange={async (c) => await this.CharsetTextbox_Change(c.target.value)} />
                <span className="info">{this.state.charsetInfo}</span>
                <br />
                <Checkbox disabled label={`Only real english words (${WORDS.length} in database)`} value={true} onChange={(v) => console.log(v)} />
                <Checkbox disabled label="Do not use Backspace" value={true} onChange={(v) => console.log(v)} />
                <Checkbox label="Multiply words" value={this.state.multiplyWords} onChange={async (v) => await this.Reload({ multiplyWords: v })} />
                <Checkbox disabled label="Programmer stuff" value={false} onChange={(v) => console.log(v)} />
                <Checkbox label="Titlecase sometimes" value={this.state.titlecaseSometimes} onChange={async (v) => await this.Reload({ titlecaseSometimes: v })} />
                <Checkbox disabled label="Random interpunction" value={false} onChange={(v) => console.log(v)} />
                <Checkbox disabled label="Insert some numbers" value={false} onChange={(v) => console.log(v)} />
            </div >
        );
    }
}