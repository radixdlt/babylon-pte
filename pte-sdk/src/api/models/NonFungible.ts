/* tslint:disable */
/* eslint-disable */
/**
 * Babylon PTE API
 * Babylon Public Test Environment (PTE) API specification.
 *
 * The version of the OpenAPI document: 0.1.25
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
 * @interface NonFungible
 */
export interface NonFungible {
    /**
     * 
     * @type {string}
     * @memberof NonFungible
     */
    resourceAddress: string;
    /**
     * 
     * @type {string}
     * @memberof NonFungible
     */
    immutableData: string;
    /**
     * 
     * @type {string}
     * @memberof NonFungible
     */
    mutableData: string;
}

export function NonFungibleFromJSON(json: any): NonFungible {
    return NonFungibleFromJSONTyped(json, false);
}

export function NonFungibleFromJSONTyped(json: any, ignoreDiscriminator: boolean): NonFungible {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resourceAddress': json['resource_address'],
        'immutableData': json['immutable_data'],
        'mutableData': json['mutable_data'],
    };
}

export function NonFungibleToJSON(value?: NonFungible | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'resource_address': value.resourceAddress,
        'immutable_data': value.immutableData,
        'mutable_data': value.mutableData,
    };
}

