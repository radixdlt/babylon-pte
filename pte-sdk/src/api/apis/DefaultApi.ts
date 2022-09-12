/* tslint:disable */
/* eslint-disable */
/**
 * Babylon PTE API
 * Babylon Public Test Environment (PTE) API specification.
 *
 * The version of the OpenAPI document: 0.1.28
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    BadRequest,
    BadRequestFromJSON,
    BadRequestToJSON,
    Component,
    ComponentFromJSON,
    ComponentToJSON,
    Epoch,
    EpochFromJSON,
    EpochToJSON,
    NonFungible,
    NonFungibleFromJSON,
    NonFungibleToJSON,
    Nonce,
    NonceFromJSON,
    NonceToJSON,
    Receipt,
    ReceiptFromJSON,
    ReceiptToJSON,
    Resource,
    ResourceFromJSON,
    ResourceToJSON,
    Transaction,
    TransactionFromJSON,
    TransactionToJSON,
} from '../models';

export interface GetComponentRequest {
    address: string;
}

export interface GetNonFungibleRequest {
    address: string;
}

export interface GetNonceRequest {
    signers: Array<string>;
}

export interface GetReceiptRequest {
    hash: string;
}

export interface GetResourceRequest {
    address: string;
}

export interface GetTransactionRequest {
    hash: string;
}

export interface SubmitTransactionRequest {
    transaction: Transaction;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Get info about a component
     */
    async getComponentRaw(requestParameters: GetComponentRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Component>> {
        if (requestParameters.address === null || requestParameters.address === undefined) {
            throw new runtime.RequiredError('address','Required parameter requestParameters.address was null or undefined when calling getComponent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/component/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters.address))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ComponentFromJSON(jsonValue));
    }

    /**
     * Get info about a component
     */
    async getComponent(requestParameters: GetComponentRequest, initOverrides?: RequestInit): Promise<Component> {
        const response = await this.getComponentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the current epoch
     */
    async getEpochRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Epoch>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/epoch`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EpochFromJSON(jsonValue));
    }

    /**
     * Get the current epoch
     */
    async getEpoch(initOverrides?: RequestInit): Promise<Epoch> {
        const response = await this.getEpochRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get info about a specific non-fungible unit
     */
    async getNonFungibleRaw(requestParameters: GetNonFungibleRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<NonFungible>> {
        if (requestParameters.address === null || requestParameters.address === undefined) {
            throw new runtime.RequiredError('address','Required parameter requestParameters.address was null or undefined when calling getNonFungible.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/non-fungible/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters.address))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NonFungibleFromJSON(jsonValue));
    }

    /**
     * Get info about a specific non-fungible unit
     */
    async getNonFungible(requestParameters: GetNonFungibleRequest, initOverrides?: RequestInit): Promise<NonFungible> {
        const response = await this.getNonFungibleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the nonce of a signer set
     */
    async getNonceRaw(requestParameters: GetNonceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Nonce>> {
        if (requestParameters.signers === null || requestParameters.signers === undefined) {
            throw new runtime.RequiredError('signers','Required parameter requestParameters.signers was null or undefined when calling getNonce.');
        }

        const queryParameters: any = {};

        if (requestParameters.signers) {
            queryParameters['signers'] = requestParameters.signers;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/nonce`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NonceFromJSON(jsonValue));
    }

    /**
     * Get the nonce of a signer set
     */
    async getNonce(requestParameters: GetNonceRequest, initOverrides?: RequestInit): Promise<Nonce> {
        const response = await this.getNonceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve a receipt
     */
    async getReceiptRaw(requestParameters: GetReceiptRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Receipt>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling getReceipt.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/receipt/{hash}`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReceiptFromJSON(jsonValue));
    }

    /**
     * Retrieve a receipt
     */
    async getReceipt(requestParameters: GetReceiptRequest, initOverrides?: RequestInit): Promise<Receipt> {
        const response = await this.getReceiptRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get info about a resource
     */
    async getResourceRaw(requestParameters: GetResourceRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Resource>> {
        if (requestParameters.address === null || requestParameters.address === undefined) {
            throw new runtime.RequiredError('address','Required parameter requestParameters.address was null or undefined when calling getResource.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/resource/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters.address))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ResourceFromJSON(jsonValue));
    }

    /**
     * Get info about a resource
     */
    async getResource(requestParameters: GetResourceRequest, initOverrides?: RequestInit): Promise<Resource> {
        const response = await this.getResourceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve a transaction
     */
    async getTransactionRaw(requestParameters: GetTransactionRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling getTransaction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transaction/{hash}`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Retrieve a transaction
     */
    async getTransaction(requestParameters: GetTransactionRequest, initOverrides?: RequestInit): Promise<Transaction> {
        const response = await this.getTransactionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List all components
     */
    async listComponentsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/components`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * List all components
     */
    async listComponents(initOverrides?: RequestInit): Promise<Array<string>> {
        const response = await this.listComponentsRaw(initOverrides);
        return await response.value();
    }

    /**
     * List all packages
     */
    async listPackagesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/packages`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * List all packages
     */
    async listPackages(initOverrides?: RequestInit): Promise<Array<string>> {
        const response = await this.listPackagesRaw(initOverrides);
        return await response.value();
    }

    /**
     * List all resources
     */
    async listResourcesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/resources`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * List all resources
     */
    async listResources(initOverrides?: RequestInit): Promise<Array<string>> {
        const response = await this.listResourcesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Execute a signed transaction
     */
    async submitTransactionRaw(requestParameters: SubmitTransactionRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Receipt>> {
        if (requestParameters.transaction === null || requestParameters.transaction === undefined) {
            throw new runtime.RequiredError('transaction','Required parameter requestParameters.transaction was null or undefined when calling submitTransaction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transaction`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TransactionToJSON(requestParameters.transaction),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReceiptFromJSON(jsonValue));
    }

    /**
     * Execute a signed transaction
     */
    async submitTransaction(requestParameters: SubmitTransactionRequest, initOverrides?: RequestInit): Promise<Receipt> {
        const response = await this.submitTransactionRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
