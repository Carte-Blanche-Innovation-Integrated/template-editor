import {useEffect, useState} from "react";
import {HTMLDocument, PlainTextDocument} from "./core/Documents.ts";
import {TextHighlighter} from "./components/TextHighlighter.tsx";
import {ExclamationTriangleIcon} from '@heroicons/react/24/solid'
import clsx from "clsx";

const domParser = new DOMParser();


function App() {
  const [tab, setTab] = useState('plain');
  const [textDoc, setTextDoc] = useState<PlainTextDocument>();
  const [htmlDoc, setHTMLDoc] = useState<HTMLDocument>();

  useEffect(() => {
    fetch('/article.txt')
      .then(res => res.text())
      .then((text) => {
        const doc = new PlainTextDocument(text);
        setTextDoc(doc);
        return null
      });

    fetch('/article-html')
      .then(res => res.text())
      .then((text) => {
        const parsedhtml = domParser.parseFromString(text, 'text/html');
        console.log(parsedhtml.body);
        const doc = new HTMLDocument(parsedhtml.body);
        setHTMLDoc(doc);
        return null
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <nav className="flex space-x-2 justify-end mb-4" aria-label="Tabs">
        <button
          className={clsx(
            tab === 'plain' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:text-gray-800',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          onClick={() => setTab('plain')}
        >
          Plain Text
        </button>
        <button
          className={clsx(
            tab === 'rich' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:text-gray-800',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          onClick={() => setTab('rich')}
        >
          Rich Text
        </button>
      </nav>
      {textDoc && tab === 'plain' && <TextHighlighter doc={textDoc}/>}
      {tab === 'rich' && (
        <>
          <div className="flex bg-yellow-50 ring-1 ring-yellow-400 p-4 rounded mb-2">
            <ExclamationTriangleIcon className="flex-shrink-0 h-5 w-5 text-yellow-400" aria-hidden="true"/>
            <p className="ml-3 text-sm text-yellow-700">
              Rich text highlighting is experimental.
            </p>
          </div>
          {htmlDoc && <TextHighlighter doc={htmlDoc}/>}
        </>
      )}
    </div>
  )
}

export default App
