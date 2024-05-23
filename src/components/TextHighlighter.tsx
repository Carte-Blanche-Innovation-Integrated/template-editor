import {ComponentProps, CSSProperties, Fragment, type JSX, ReactNode, useRef, useState} from "react";
import {BaseDocument, TagNodeData} from "../core/Documents.ts";
import {MarkerNode} from "../core/MarkerNode.ts";
import './styles.css';

interface Props<T extends BaseDocument = BaseDocument> {
  doc: T;
}

export function TextHighlighter<T extends BaseDocument = BaseDocument>({doc}: Props<T>) {
  const [, rerender] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  function getDocumentOffset(node?: Node | null) {
    if (!node || !rootRef.current?.contains(node)) {
      return undefined;
    }
    if (node.nodeType === node.TEXT_NODE) {
      node = node.parentNode as Node;
    }
    if (!(node as Element).hasAttribute('data-offset')) {
      return undefined;
    }

    node.normalize();
    return +((node as Element).getAttribute('data-offset') ?? 0);
  }

  function handlePointerUp() {
    const selection = window.getSelection();
    const ranges = new Array(selection?.rangeCount ?? 0)
      .fill(0)
      .map((_, i) => selection!.getRangeAt(i))
      .filter((r) => !r.collapsed);

    for (const range of ranges) {
      const startOffset = getDocumentOffset(range.startContainer);
      const endOffset = getDocumentOffset(range.endContainer);
      if (startOffset === undefined || endOffset === undefined) {
        continue;
      }

      const start = startOffset + range.startOffset;
      const end = endOffset + range.endOffset;

      doc.tree.addChildren(new MarkerNode<TagNodeData>(start, end, {tag: 'span', kind: 'annotation'}));
      rerender(Math.random());
    }

    selection?.empty();
  }

  return (
    <div className="prose max-w-none border border-gray-300 rounded-lg p-4" ref={rootRef} onPointerUp={handlePointerUp}>
      <Marker node={doc.tree} doc={doc}/>
    </div>
  );
}

type MarkerProps<T extends BaseDocument, El extends keyof JSX.IntrinsicElements> = {
  node: MarkerNode<TagNodeData>,
  doc: T,
  annotationLevel?: number,
} & ComponentProps<El>;


function Marker<
  El extends keyof JSX.IntrinsicElements,
  Doc extends BaseDocument = BaseDocument
>({node, doc, annotationLevel = 0, ...restProps}: MarkerProps<Doc, El>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = (node.data.tag ?? 'span') as any;

  let nodeOffset = node.children.flatMap((e) => [e.start, e.end]);
  nodeOffset = [node.start, ...nodeOffset, node.end];
  nodeOffset = Array.from(new Set(nodeOffset)).sort((a, b) => a - b);

  const children: ReactNode[] = [];

  for (let i = 0; i < (nodeOffset.length - 1); i++) {
    const childNode = node.children.find((e) => e.start === nodeOffset[i] && e.end === nodeOffset[i + 1]);
    if (childNode) {
      children.push(
        <Marker
          key={childNode.key}
          annotationLevel={node.data.kind === 'annotation' ? annotationLevel + 1 : annotationLevel}
          doc={doc}
          node={childNode}
        />
      )
      continue;
    }

    const text = doc.getText({start: nodeOffset[i], end: nodeOffset[i + 1]})

    if (text.trim() && nodeOffset.length > 2) {
      children.push(
        <span
          key={`${nodeOffset[i]}-${nodeOffset[i + 1]}`}
          data-offset={nodeOffset[i]}
          data-start={nodeOffset[i]}
          data-end={nodeOffset[i + 1]}
        >
          {text}
        </span>
      );
      continue;
    }
    children.push(<Fragment key={`${nodeOffset[i]}-${nodeOffset[i + 1]}`}>{text}</Fragment>);
  }

  return (
    <Element
      data-offset={node.start}
      style={{'--level': annotationLevel} as CSSProperties}
      data-kind={node.data.kind}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(restProps as any)}
    >
      {...children}
    </Element>
  )
}
