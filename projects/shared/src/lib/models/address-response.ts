export interface ICoordinatesParams {
  admCd?: string;     // 행정구역코드
  rnMgtSn?: string;   // 도로명코드
  udrtYn?: '0' | '1'; // 지하 여부(0, 1)
  buldMnnm?: string;  // 건물본번
  buldSlno?: string;  // 건물부번
}

export interface IAddressResponse extends ICoordinatesParams {
  name?: string;      // 지번 주소
  road?: string;      // 도로명 주소
  enName?: string;    // 영문 주소
  postCode?: string;  // 우편 번호
}

export interface ICoordinatesResponse {
  lng?: number;   // 경도
  lat?: number;   // 위도
}
