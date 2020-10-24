interface Tree {
  [key: string]: any;
  children?: Tree[];
}

function flatTree(tree: Tree[], list: Tree[] = []) {
  // eslint-disable-next-line no-restricted-syntax
  for (const i of tree) {
    list.push(i);
    if (i.children) {
      flatTree(i.children, list);
    }
  }
  return list;
}

export default flatTree;
