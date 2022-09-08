import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { INativeFile, IProjectFile, TSourceTree } from '../../../../types';

@Component({
  selector: 'sw-source-tree',
  templateUrl: './source-tree.component.html',
  styleUrls: ['./source-tree.component.scss']
})
export class SourceTreeComponent implements OnInit {

  @Input() selectable = false;
  @Input() @HostBinding('style.height') height = 'auto';

  private _tree: TSourceTree;

  constructor() {
  }

  @Input() set sourceTree(tree: TSourceTree) {
    tree.forEach(item => {
      if ('dirname' in item) {
        item.opened = true;
      }
    });
    this._tree = tree;
  }

  get sourceTree(): TSourceTree {
    return this._tree;
  }

  get selectedFiles(): Array<INativeFile | IProjectFile> {
    return this._getFiles(true);
  }

  get unselectedFiles(): Array<INativeFile | IProjectFile> {
    return this._getFiles(false);
  }

  ngOnInit(): void {
  }

  private _getFiles(selected: boolean): Array<INativeFile | IProjectFile> {
    function trace(tree: TSourceTree, list: Array<INativeFile | IProjectFile>): void {
      tree.forEach(item => {
        if ('dirname' in item) {
          trace(item.entries, list);
        } else if (!!item.selected === selected) {
          list.push(item);
        }
      });
    }

    const files: Array<INativeFile | IProjectFile> = [];

    trace(this._tree, files);

    return files;
  }
}
