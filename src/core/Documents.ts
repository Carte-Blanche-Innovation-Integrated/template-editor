import type {JSX} from 'react';

import {MarkerNode} from './MarkerNode.ts';

export interface TagNodeData {
  tag: keyof JSX.IntrinsicElements;
  kind?: 'annotation';
}

export abstract class BaseDocument {
  abstract text: string;
  abstract tree: MarkerNode<TagNodeData>;

  getText({start, end}: {start: number; end: number}) {
    return this.text.slice(start, end);
  }
}

export class PlainTextDocument extends BaseDocument {
  public tree: MarkerNode<TagNodeData>;

  constructor(public text: string) {
    super();
    this.tree = this.buildTree();
  }

  private buildTree() {
    let start = 0;

    const paragraphs = this.text
      .split('\n')
      .flatMap((line) => {
        if (!line) {
          start += line.length;
          start += 1;
          return [];
        }

        const node = new MarkerNode<TagNodeData>(start, start + line.length, {tag: 'p'});
        start += line.length;
        start += 1;
        return [node];
      })
      .filter(Boolean);

    return new MarkerNode<TagNodeData>(0, this.text.length, {tag: 'article'}, paragraphs);
  }
}

export class HTMLDocument extends BaseDocument {
  public tree: MarkerNode<TagNodeData>;
  public text = '';

  constructor(node: Node) {
    super();
    this.tree = this.buildTree(node);
  }

  private buildTree(node: Node) {
    const start = this.text.length;
    let end = start;
    const markers: MarkerNode<TagNodeData>[] = [];

    for (const child of node.childNodes) {
      if (
        child.nodeType === Node.TEXT_NODE ||
        (child.nodeType === Node.ELEMENT_NODE &&
          child.childNodes.length === 1 &&
          child.childNodes[0].nodeType === Node.TEXT_NODE)
      ) {
        const childText =
          child.textContent
            ?.replace(/\n+\s+/g, '\n')
            .replace(/^\s+/, ' ')
            .replace(/\s+$/, ' ') ?? '';

        const startIndex = this.text.length;
        const endIndex = startIndex + childText.length;
        end += childText.length;
        this.text += childText;

        const tagName =
          child.nodeType === Node.TEXT_NODE ? 'span' : (child as HTMLElement).tagName?.toLowerCase();
        markers.push(
          new MarkerNode<TagNodeData>(startIndex, endIndex, {
            tag: (tagName ?? 'span') as TagNodeData['tag'],
          })
        );
        continue;
      }

      if (child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        const marker = this.buildTree(child);
        markers.push(marker);
        end += marker.size;
      }
    }

    const tagName = (node as HTMLElement).tagName.toLowerCase() as TagNodeData['tag'];
    return new MarkerNode<TagNodeData>(
      start,
      end,
      {
        tag: tagName === 'body' ? 'article' : tagName,
      },
      markers
    );
  }
}
