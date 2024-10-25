import { Router } from 'express';
import { jobsController } from '../controllers/jobs.controller.js';
import { authController } from '../controllers/auth.controller.js';
import {applicationController} from '../controllers/application.controller.js';
import {fileUploadController} from '../controllers/fileUpload.controller.js';
import { imageProcessorMiddleware } from '../middleware/imageProcessor.middleware.js';
import { rbacMiddleware } from '../middleware/rbac.middleware.js';
import { routesConstants } from '../constants/routes.constants.js';
import {GeneratePermissionsUtility} from '../utilities/generatePermissions.utility.js';
import { ActionsConstant } from '../constants/permissions/actions.constant.js';
import { EffectConstant } from '../constants/permissions/effect.constant.js';
import { TargetConstant } from '../constants/permissions/target.constant.js';
import { TypeConstant } from '../constants/permissions/type.constant.js';
const { generatePermission } = new GeneratePermissionsUtility();
//## Initialize express router;
export const apiRoute = Router();

//## register endpoint
apiRoute.post(routesConstants.USERS.CREATE, [rbacMiddleware.handleToken, rbacMiddleware.handleRbac(
    generatePermission({
        resourceTarget: TargetConstant.USERS,
        resourceType: TypeConstant.ANY,
        action: ActionsConstant.CREATE,
        effect: EffectConstant.ALLOW,
    })
)], authController.createUser);

//Login user endpoint
apiRoute.post(
    routesConstants.USERS.LOGIN,
    [rbacMiddleware.handleToken, rbacMiddleware.handleRbac(
        generatePermission({
            resourceTarget: TargetConstant.USERS,
            resourceType: TypeConstant.ANY,
            action: ActionsConstant.CREATE,
            effect: EffectConstant.ALLOW,
        })
    )],
    authController.loginUser
);

//Create Product endpoint
apiRoute.post(
    routesConstants.JOBS.ADD,
    jobsController.createJob
);

//get all Products endpoint
apiRoute.get(routesConstants.JOBS.GET_ALL, jobsController.getJob);

//get a Product endpoint
apiRoute.get(
    routesConstants.JOBS.GET_SINGLE, jobsController.getSingleJob
);

//Update a product
apiRoute.put(routesConstants.JOBS.UPDATE, jobsController.updateJob);

apiRoute.post(routesConstants.APPLICATION.ADD, applicationController.createApplication);

apiRoute.put(routesConstants.APPLICATION.GET_SINGLE, applicationController.removeFromApplication);

apiRoute.get(routesConstants.APPLICATION.GET_ALL, applicationController.getAllApplications);

apiRoute.get(routesConstants.APPLICATION.GET_SINGLE, applicationController.getSingleApplication);

//Image Upload
apiRoute.post(
    routesConstants.UPLOAD.IMAGE,
    imageProcessorMiddleware.handle,
    fileUploadController.single
);
//Get all users
apiRoute.get(routesConstants.USERS.GET_ALL,[rbacMiddleware.handleToken, rbacMiddleware.handleRbac(
    generatePermission({
        resourceTarget: TargetConstant.USERS,
        resourceType: TypeConstant.ANY,
        action: ActionsConstant.CREATE,
        effect: EffectConstant.ALLOW,
    })
)], authController.getAllUsers);
