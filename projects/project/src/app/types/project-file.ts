import { IUserInfo } from 'shared';

export interface IMultipleOption {
  multiple?: boolean;
}

export interface IAcceptOption {
  accept?: string;
}

export interface IFileChooserFilterOptions {
  filenameFilters?: RegExp[];
  mimetypeFilters?: RegExp[];
  exceptFilenameFilters?: RegExp[];
  exceptMimetypeFilters?: RegExp[];
}

export interface IDirectoryChooserOptions extends IFileChooserOptions {
  directoryFilters?: RegExp[];
  exceptDirectoryFilters?: RegExp[];
}

export declare type TDropType = 'directory' | 'file' | 'all';

export interface IFileChooserOptions extends IMultipleOption, IAcceptOption, IFileChooserFilterOptions {
}

export interface ITraceOptions extends IDirectoryChooserOptions {
  type?: TDropType;
}

export interface IDropFilesOptions extends ITraceOptions, IMultipleOption {
}


export interface IProjectFile {
  _id?: string;
  path: string;       // 파일 경로(URL path)
  name: string;       // 원본 파일 명
  size: number;       // 파일 크기(bytes)
  type: string;       // mimetype
  project: string;    // 파일이 참조하는 프로젝트 아이디
  creator: IUserInfo; // 파일 생성자
  createdAt: Date;    // 파일 생성일
  selected?: boolean;
}

export interface INativeFile {
  selected?: boolean;
  file: File;
}


export interface IDirectoryEntry {
  dirname: string;
  entries: TSourceTree;
  opened?: boolean;
}

export type TSourceTreeItem = IDirectoryEntry | IProjectFile | INativeFile;
export type TSourceTree = Array<TSourceTreeItem>;
