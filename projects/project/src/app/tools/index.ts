import * as XLSX from 'xlsx';
import { WorkSheet } from 'xlsx';
import { INativeFile, IProjectFile, Params, TSourceTree } from '../types';

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

export function convertQueryToParams(query: any, defaultQuery?: any): Params {
  const params: Params = { ...defaultQuery };
  Object.keys(query || {}).forEach(key => {
    const value = query[key];
    if (Array.isArray(value) && value.length > 0) {
      params[key] = value.join(',');
    } else if (value !== null && value !== undefined) {
      params[key] = value;
    }
  });
  return params;
}

export const toNumber = (v) => !v && +v !== 0 ? null : +(typeof v === 'string' ? v.trim().replace(/,/g, '') : v);

export function sheetToJSON(sheet: WorkSheet): any[] {
  return XLSX.utils.sheet_to_json(sheet, { raw: false }).map((row: any) => {
    Object.keys(row).forEach(key => {
      const k = key.toUpperCase().trim().replace(/\s+/g, ' ');
      row[k] = typeof row[key] === 'string' ? row[key].trim() : row[key];
      if (k !== key) {
        delete row[key];
      }
    });
    return row;
  });
}
