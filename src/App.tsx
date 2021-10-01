import React, { useState, ChangeEvent, ReactNode } from "react";
import Interweave, {
  Matcher,
  MatchResponse,
  Node,
  ChildrenNode,
} from "interweave";
import "./App.css";
import { useDebounce } from "usehooks-ts";
import { Filter } from "interweave";

function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce<string>(text, 500);
  const inputText = (
    <textarea
      value={text}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        setText(e.target.value)
      }
      cols={220}
      rows={20}
    ></textarea>
  );
  //const outputText = <p>{text}</p>;
  return (
    <div className="App">
      {inputText}
      <br />
      <Interweave filters={[new LinkFilter()]} content={debouncedText} />
    </div>
  );
}

class LinkFilter extends Filter {
  attribute(name: string, value: string): string {
    let str = value.slice(6);
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

//const filter = new LinkFilter();

export default App;
