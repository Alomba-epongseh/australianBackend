/**

Defines constants for various API routes used in the application.
@typedef {Object} RoutesConstants
@property {string} API_DOCS - The route to access the API documentation.
@property {Object} USERS - The routes related to user management.
@property {string} USERS.CREATE - The route to create a new user.
@property {string} USERS.LOGIN - The route to authenticate a user.
@property {Object} USERS.CART - The routes related to user cart management.
@property {string} USERS.CART.ADD - The route to add a product to a user's cart.
@property {string} USERS.CART.DELETE - The route to remove a product from a user's cart.
@property {Object} PRODUCTS - The routes related to product management.
@property {string} PRODUCTS.CREATE - The route to create a new product.
@property {string} PRODUCTS.GET_SINGLE - The route to get a single product by ID.
@property {string} PRODUCTS.GET_ALL - The route to get all products.
@property {string} PRODUCTS.DELETE - The route to delete a product.
@property {Object} CART - The routes related to cart management.
@property {string} CART.ADD - The route to add a product to a cart.
*/
/**

A constant object containing the API routes used in the application.

@type {RoutesConstants}
*/
export const routesConstants = {
    API_DOCS: '/api/docs',
    USERS: {
        CREATE: '/api/users/create',
        LOGIN: '/api/users/login',
        GET_ALL: '/api/users/get',
        OTP_VERIFY:'/api/users/otp',
        GET_SINGLE: '/api/users/get/:id',
        GET_CART: '/api/users/getcarts',
        JOBS: {
            ADD: '/api/:userId/jobs/create',
            GET_ALL: '/api/:userId/jobs',
            UPDATE: '/api/:userId/jobs/update',
          },
    },
    JOBS: {
        ADD: '/api/jobs/create',
        GET_ALL: '/api/jobs',
        GET_SINGLE: '/api/jobs/get/:id',
        UPDATE: '/api/jobs/update',
      },
      APPLICATION: {
        ADD: '/api/applications/create',
        GET_ALL: '/api/applications',
        GET_SINGLE: '/api/applications/get/:id',
      },
    UPLOAD: {
        IMAGE: '/api/upload/images',
    },
};
