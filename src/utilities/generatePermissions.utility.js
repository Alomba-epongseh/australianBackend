import { ActionsConstant } from '../constants/permissions/actions.constant.js';
import { EffectConstant } from '../constants/permissions/effect.constant.js';
import { RoleConstant } from '../constants/permissions/role.constant.js';
import { TargetConstant } from '../constants/permissions/target.constant.js';
import { TypeConstant } from '../constants/permissions/type.constant.js';
export class GeneratePermissionsUtility {
    generateGlobalPermission(role) {
        switch (role) {
            case RoleConstant.SUPER_ADMIN:
                return [
                    this.generatePermission({
                        resourceType: TypeConstant.ANY,
                        action: ActionsConstant.ALL,
                        resourceTarget: TargetConstant.ALL,
                        effect: EffectConstant.ALLOW,
                    }),
                ];

            case RoleConstant.ADMIN:
                return [
                    this.generatePermission({
                        resourceType: TypeConstant.ANY,
                        action: ActionsConstant.ALL,
                        resourceTarget: TargetConstant.ALL,
                        effect: EffectConstant.ALLOW,
                    }),
                ];

            case RoleConstant.GUEST:
                return [
                    this.generatePermission({
                        resourceType: TypeConstant.GET_USER,
                        action: ActionsConstant.READ,
                        resourceTarget: TargetConstant.USERS,
                        effect: EffectConstant.ALLOW,
                    }),
                ];

            case RoleConstant.CUSTOMER:
                return [
                    this.generatePermission({
                        resourceType: TypeConstant.GET_USER,
                        action: ActionsConstant.READ,
                        resourceTarget: TargetConstant.USERS,
                        effect: EffectConstant.ALLOW,
                    }),
                ];

            default:
                throw new Error(`unsupported workspace role - ${role}`);
        }
    }

    generatePermission(arg) {
        return arg;
    }
}
