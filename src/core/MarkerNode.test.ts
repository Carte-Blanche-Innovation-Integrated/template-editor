import {expect, test} from 'vitest';

import {MarkerNode} from './MarkerNode';

test('1. Non overlapping markers', () => {
  const rootNode = new MarkerNode(0, Infinity, 0);

  const node1 = new MarkerNode(0, 5, 0);
  const node2 = new MarkerNode(6, 10, 0);

  rootNode.addChildren(node1, node2);

  expect(rootNode.children.length).toBe(2);
  expect(rootNode.children[0]).toBe(node1);
  expect(rootNode.children[1]).toBe(node2);
});

test('2. New marker is a super marker', () => {
  const rootNode = new MarkerNode(0, Infinity, 0);

  const node1 = new MarkerNode(1, 5, 0);
  const node2 = new MarkerNode(6, 10, 0);
  const node3 = new MarkerNode(1, 10, 0);

  rootNode.addChildren(node1, node2, node3);

  expect(rootNode.children.length).toBe(1);
  expect(node3.children[0]).toBe(node1);
  expect(node3.children[1]).toBe(node2);
});

test('3. New marker is a sub marker', () => {
  const rootNode = new MarkerNode(0, Infinity, 0);

  const node1 = new MarkerNode(1, 10, 0);
  const node2 = new MarkerNode(1, 5, 0);

  rootNode.addChildren(node1, node2);

  expect(rootNode.children.length).toBe(1);
  expect(node1.children[0]).toBe(node2);
});

test('4. Overlapping multiple markers', () => {
  const rootNode = new MarkerNode(0, Infinity, 0);

  const node1 = new MarkerNode(3, 7, 0);

  const node2 = new MarkerNode(1, 5, 0);
  const node3 = new MarkerNode(5, 10, 0);

  rootNode.addChildren(node1, node2, node3);

  expect(node1.children.length).toBe(2);
  expect(rootNode.children.length).toBe(3);
});

test('5. Overlapping multiple markers with being super marker of some', () => {
  const rootNode = new MarkerNode(0, Infinity, 0);

  const node1 = new MarkerNode(1, 5, 0);
  const node2 = new MarkerNode(7, 10, 0);

  const node4 = new MarkerNode(3, 15, 0);

  rootNode.addChildren(node1, node2, node4);
  expect(rootNode.children.length).toBe(2);
});
