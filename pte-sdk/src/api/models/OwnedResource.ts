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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface OwnedResource
 */
export interface OwnedResource {
    /**
     * 
     * @type {string}
     * @memberof OwnedResource
     */
    amount: string;
    /**
     * 
     * @type {string}
     * @memberof OwnedResource
     */
    resourceAddress: string;
    /**
     * 
     * @type {string}
     * @memberof OwnedResource
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof OwnedResource
     */
    symbol: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof OwnedResource
     */
    nonFungibleIds?: Array<string>;
}

export function OwnedResourceFromJSON(json: any): OwnedResource {
    return OwnedResourceFromJSONTyped(json, false);
}

export function OwnedResourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): OwnedResource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'amount': json['amount'],
        'resourceAddress': json['resource_address'],
        'name': json['name'],
        'symbol': json['symbol'],
        'nonFungibleIds': !exists(json, 'non_fungible_ids') ? undefined : json['non_fungible_ids'],
    };
}

export function OwnedResourceToJSON(value?: OwnedResource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'amount': value.amount,
        'resource_address': value.resourceAddress,
        'name': value.name,
        'symbol': value.symbol,
        'non_fungible_ids': value.nonFungibleIds,
    };
}

