export interface QueryConvertor<Query> {
  convertParamsToQuery(): Query;
}

