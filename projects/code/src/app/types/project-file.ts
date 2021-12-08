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
  ref: string;        // 파일과 관련된 모델의 아이디
  refType: string;    // 파일이 참조하는 모델 유형(파일과 관련된 모델명)
  creator: IUserInfo; // 파일 생성자
  createdAt: Date;    // 파일 생성일
}

export interface ISelectableFile {
  selected?: boolean;
  file: IProjectFile | File;
}

export interface IDirectoryEntry {
  dirname: string;
  opened?: boolean;
  entries: TSelectableEntryList | TEntryList;
}

export declare type TSelectableEntryList = Array<IDirectoryEntry | ISelectableFile>;
export declare type TEntryList = Array<IDirectoryEntry | IProjectFile>;
