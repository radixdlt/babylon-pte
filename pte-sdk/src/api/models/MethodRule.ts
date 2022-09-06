/* tslint:disable */
/* eslint-disable */
/**
 * Babylon PTE API
 * Babylon Public Test Environment (PTE) API specification.
 *
 * The version of the OpenAPI document: 0.1.27
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
 * @interface MethodRule
 */
export interface MethodRule {
    /**
     * 
     * @type {string}
     * @memberof MethodRule
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof MethodRule
     */
    rule: string;
}

export function MethodRuleFromJSON(json: any): MethodRule {
    return MethodRuleFromJSONTyped(json, false);
}

export function MethodRuleFromJSONTyped(json: any, ignoreDiscriminator: boolean): MethodRule {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'rule': json['rule'],
    };
}

export function MethodRuleToJSON(value?: MethodRule | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'rule': value.rule,
    };
}

