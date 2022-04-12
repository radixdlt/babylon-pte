/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AnyValue = any;

export interface Signature {
  publicKey: string;
  signature: string;
}

export interface Transaction {
  manifest: string;

  /** @format int64 */
  nonce: number;
  signatures: Signature[];
}

export interface Receipt {
  transactionHash: string;
  status: string;
  outputs: AnyValue[];
  logs: string[];
  newPackages: string[];
  newComponents: string[];
  newResources: string[];
}

export interface OwnedResource {
  amount: string;
  resourceAddress: string;
  name: string;
  symbol: string;
}

export interface Component {
  blueprint?: { packageAddress: string; blueprintName: string };
  authorization?: AnyValue;
  state?: AnyValue;
  ownedResources?: OwnedResource[];
}

export interface Resource {
  resourceType: string;
  divisibility: number;
  metadata: { name?: string; value?: string }[];
  totalSupply: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000/" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Babylon PTE API
 * @version 1.0.0-draft
 * @baseUrl http://127.0.0.1:8000/
 *
 * Babylon Public Test Environment (PTE) API specification.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  component = {
    /**
     * No description
     *
     * @name GetComponent
     * @summary Get info about a component
     * @request GET:/component/{address}
     */
    getComponent: (address: string, params: RequestParams = {}) =>
      this.request<Component, void>({
        path: `/component/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  resource = {
    /**
     * No description
     *
     * @name GetResource
     * @summary Get info about a resource
     * @request GET:/resource/{address}
     */
    getResource: (address: string, params: RequestParams = {}) =>
      this.request<Resource, void>({
        path: `/resource/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  nonce = {
    /**
     * No description
     *
     * @name GetNonce
     * @summary Get the nonce of a signer set
     * @request GET:/nonce
     */
    getNonce: (query: { signers: string[] }, params: RequestParams = {}) =>
      this.request<number, void>({
        path: `/nonce`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  receipt = {
    /**
     * No description
     *
     * @name GetReceipt
     * @summary Retrieve a transaction receipt (NOT IMPLEMENTED).
     * @request GET:/receipt/{hash}
     */
    getReceipt: (hash: string, params: RequestParams = {}) =>
      this.request<Receipt, void>({
        path: `/receipt/${hash}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  transaction = {
    /**
     * No description
     *
     * @name GetTransaction
     * @summary Retrieve a transaction (NOT IMPLEMENTED).
     * @request GET:/transaction/{hash}
     */
    getTransaction: (hash: string, params: RequestParams = {}) =>
      this.request<Transaction, void>({
        path: `/transaction/${hash}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name SubmitTransaction
     * @summary Submit a signed transaction
     * @request POST:/transaction
     */
    submitTransaction: (data: Transaction, params: RequestParams = {}) =>
      this.request<Receipt, void>({
        path: `/transaction`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  manifest = {
    /**
     * No description
     *
     * @name SignManifest
     * @summary Sign a manifest using the shared key pair.
     * @request POST:/manifest
     */
    signManifest: (data: string, params: RequestParams = {}) =>
      this.request<Transaction, void>({
        path: `/manifest`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
