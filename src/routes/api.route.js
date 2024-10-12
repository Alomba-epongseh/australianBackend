import { Router } from 'express';
import {
    authController,
    jobsController,
    applicationController,
    fileUploadController,
} from '../controllers/index';
import {
    imageProcessorMiddleware,
    registrationValidator,
    loginValidator,
    rbacMiddleware,
} from '../middleware/index';
import { routesConstants } from '../constants/index';
import {GeneratePermissionsUtility} from '../utilities';
import {
    ActionsConstant,
    EffectConstant,
    TargetConstant,
    TypeConstant,
} from '../constants/index.js';
const { generatePermission } = new GeneratePermissionsUtility();
//## Initialize express router;
export const apiRoute = Router();

//## register endpoint
apiRoute.post(routesConstants.USERS.CREATE, [registrationValidator, rbacMiddleware.handleToken, rbacMiddleware.handleRbac(
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
    [loginValidator, rbacMiddleware.handleToken, rbacMiddleware.handleRbac(
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
