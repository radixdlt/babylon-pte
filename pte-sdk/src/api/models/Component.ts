/* tslint:disable */
/* eslint-disable */
/**
 * Babylon PTE API
 * Babylon Public Test Environment (PTE) API specification.
 *
 * The version of the OpenAPI document: 0.1.26
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AccessRules,
    AccessRulesFromJSON,
    AccessRulesFromJSONTyped,
    AccessRulesToJSON,
} from './AccessRules';
import {
    ComponentBlueprint,
    ComponentBlueprintFromJSON,
    ComponentBlueprintFromJSONTyped,
    ComponentBlueprintToJSON,
} from './ComponentBlueprint';
import {
    OwnedResource,
    OwnedResourceFromJSON,
    OwnedResourceFromJSONTyped,
    OwnedResourceToJSON,
} from './OwnedResource';

/**
 * 
 * @export
 * @interface Component
 */
export interface Component {
    /**
     * 
     * @type {ComponentBlueprint}
     * @memberof Component
     */
    blueprint: ComponentBlueprint;
    /**
     * A component is associated with a chain of access checks, each configured by a `AccessRules`.
     * @type {Array<AccessRules>}
     * @memberof Component
     */
    accessChecks: Array<AccessRules>;
    /**
     * 
     * @type {string}
     * @memberof Component
     */
    state: string;
    /**
     * 
     * @type {Array<OwnedResource>}
     * @memberof Component
     */
    ownedResources: Array<OwnedResource>;
}

export function ComponentFromJSON(json: any): Component {
    return ComponentFromJSONTyped(json, false);
}

export function ComponentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Component {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'blueprint': ComponentBlueprintFromJSON(json['blueprint']),
        'accessChecks': ((json['access_checks'] as Array<any>).map(AccessRulesFromJSON)),
        'state': json['state'],
        'ownedResources': ((json['owned_resources'] as Array<any>).map(OwnedResourceFromJSON)),
    };
}

export function ComponentToJSON(value?: Component | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'blueprint': ComponentBlueprintToJSON(value.blueprint),
        'access_checks': ((value.accessChecks as Array<any>).map(AccessRulesToJSON)),
        'state': value.state,
        'owned_resources': ((value.ownedResources as Array<any>).map(OwnedResourceToJSON)),
    };
}

