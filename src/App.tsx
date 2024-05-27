import clsx from 'clsx';
import {useEffect, useState} from 'react';

import {ExclamationTriangleIcon} from '@heroicons/react/24/solid';

import {TextHighlighter} from './components/TextHighlighter.tsx';
import {HTMLDocument, PlainTextDocument} from './core/Documents.ts';

const domParser = new DOMParser();

function App() {
  const [tab, setTab] = useState('plain');
  const [textDoc, setTextDoc] = useState<PlainTextDocument>();
  const [htmlDoc, setHTMLDoc] = useState<HTMLDocument>();

  useEffect(() => {
    fetch('article.txt')
      .then((res) => res.text())
      .then((text) => {
        const doc = new PlainTextDocument(text);
        setTextDoc(doc);
        return null;
      });

    fetch('article-html')
      .then((res) => res.text())
      .then((text) => {
        const parsedhtml = domParser.parseFromString(text, 'text/html');
        console.log(parsedhtml.body);
        const doc = new HTMLDocument(parsedhtml.body);
        setHTMLDoc(doc);
        return null;
      });
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <nav
        className="mb-4 flex justify-end space-x-2"
        aria-label="Tabs"
      >
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
      {textDoc && tab === 'plain' && <TextHighlighter doc={textDoc} />}
      {tab === 'rich' && (
        <>
          <div className="mb-2 flex rounded bg-yellow-50 p-4 ring-1 ring-yellow-400">
            <ExclamationTriangleIcon
              className="h-5 w-5 flex-shrink-0 text-yellow-400"
              aria-hidden="true"
            />
            <p className="ml-3 text-sm text-yellow-700">Rich text highlighting is experimental.</p>
          </div>
          {htmlDoc && <TextHighlighter doc={htmlDoc} />}
        </>
      )}
    </div>
  );
}

export default App;
