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
 * @interface Nonce
 */
export interface Nonce {
    /**
     * 
     * @type {number}
     * @memberof Nonce
     */
    value: number;
}

export function NonceFromJSON(json: any): Nonce {
    return NonceFromJSONTyped(json, false);
}

export function NonceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Nonce {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': json['value'],
    };
}

export function NonceToJSON(value?: Nonce | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}

