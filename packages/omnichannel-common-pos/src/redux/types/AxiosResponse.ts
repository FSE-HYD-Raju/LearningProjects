import { AxiosResponse as BaseResponse } from "axios";

export interface AxiosResponse<T = any> extends BaseResponse {
    included: Array<any>;
  }
