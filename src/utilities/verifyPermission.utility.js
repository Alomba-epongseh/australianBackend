import { ActionsConstant } from '../constants/permissions/actions.constant.js';
import { EffectConstant } from '../constants/permissions/effect.constant.js';
import { TargetConstant } from '../constants/permissions/target.constant.js';
import { TypeConstant } from '../constants/permissions/type.constant.js';

export const verifyPermissionUtility = (
    grantedPermissions,
    requiredPermission
) => {
    if (requiredPermission.effect !== EffectConstant.ALLOW) {
        return false;
    }

    const matchingPermissions = grantedPermissions.filter((resource) => {
        if (
            resource.resourceTarget === requiredPermission.resourceTarget ||
            resource.resourceTarget === TargetConstant.ALL
        ) {
            return true;
        } else if (
            resource.resourceType === requiredPermission.resourceType ||
            resource.resourceType === TypeConstant.ANY
        ) {
            return true;
        } else if (
            resource.action === requiredPermission.action ||
            resource.action === ActionsConstant.ALL
        ) {
            return true;
        }

        return false;
    });

    if (!matchingPermissions.length) return false;

    return !matchingPermissions.some(
        (resource) => resource.effect === EffectConstant.DENY
    );
};
