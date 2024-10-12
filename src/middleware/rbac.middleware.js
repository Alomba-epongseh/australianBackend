import { cipherUtility, GeneratePermissionsUtility } from '../utilities/index.js';
import { ResponseHelper } from '../helpers/index.js';
import { verifyPermissionUtility } from '../utilities/index.js';
import { RoleConstant } from '../constants/index.js';


export class RbacMiddleware {

    handleToken(req, res, next) {
        const { headers: { authorization } } = req;
        if (!authorization) {
            req.user = {
                userId: '',
                duration: new Date().toString(),
                metaData: {
                    isAuthenticated: false,
                    role: RoleConstant.GUEST,
                    permissions: new GeneratePermissionsUtility().generateGlobalPermission(RoleConstant.GUEST)
                }
            };
        } else {
            const isTypeof = (object) => 'userId' in object && 'metaData' in object;
            const tokenObject = cipherUtility.decryptUtility(authorization, true);

            if (!isTypeof(tokenObject)) {
                return next(new ResponseHelper(res).error('You have tempered with the token', 401));
            }

            const { metaData, duration } = tokenObject;

            if ((!metaData?.isAuthenticated && validateDate(duration)) ||
                (metaData?.isAuthenticated && validateDate(duration))) {
                return next(new ResponseHelper(res).error('Your token expired', 401));
            }

            req.user = {
                ...tokenObject,
                duration: new Date().toString()
            };
        }
        next();
    }

    handleRbac = (requiredPermission) => (req, res, next) =>{

        const tokenObject = req.user;

        const status = verifyPermissionUtility(tokenObject.metaData.permissions, requiredPermission);

        if(!status) {
            return next(new ResponseHelper(res).error('This action is not permitted', 401));
        }

        next();
    };

}

const validateDate = (duration) => {
    const date = new Date().getTime();
    duration = new Date(duration);
    return Math.floor(date - duration);
};

export const rbacMiddleware = {
    handleToken: (req, res, next) => new RbacMiddleware().handleToken(req, res, next),
    handleRbac: (requiredPermission) => (req, res, next) => new RbacMiddleware().handleRbac(requiredPermission)(req, res, next)
};