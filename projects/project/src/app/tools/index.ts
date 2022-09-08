import { INativeFile, IProjectFile, TSourceTree } from '../types';

export function getFilesFromSourceTree(sourceTree: TSourceTree, selected: boolean): Array<INativeFile | IProjectFile> {
  function trace(tree: TSourceTree, list: Array<INativeFile | IProjectFile>): void {
    tree.forEach(entry => {
      if ('dirname' in entry) {
        trace(entry.entries, list);
      } else if (!!entry.selected === selected) {
        list.push(entry);
      }
    });
  }
  const selectList = [];
  trace(sourceTree, selectList);
  return selectList;
}
