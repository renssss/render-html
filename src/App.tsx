import React, {useState, ChangeEvent} from "react";
import Interweave from "interweave";
import "./App.css";
import {useDebounce} from "usehooks-ts";
import {Filter} from "interweave";

function App() {
    const [text, setText] = useState("");
    const debouncedText = useDebounce<string>(text, 500);
    const inputText = (<textarea value={text}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                  cols={220}
                  rows={20}>
        </textarea>);
    //const outputText = <p>{text}</p>;
    return (
        <div className="App">
            <h1 className="title">Render HTML</h1>
            <h2>Put your HTML below...</h2>
            {inputText}
            <br/>
            <Interweave filters={[new LinkFilter()]} content={debouncedText}/>
        </div>
    );
}

class LinkFilter extends Filter {
    attribute(name: string, value: string): string {
        const str: string = value.substring(0, 7);
        if (name === "href" && str !== "mailto:") {
            return encodeURIComponent(value);
        }

        return value;
    }

    node(name: string, node: HTMLElement): HTMLElement {
        if (name === "a") {
            node.setAttribute("target", "_blank");
            node.setAttribute("rel", "noopener");
        }

        return node;
    }
}

export default App;
