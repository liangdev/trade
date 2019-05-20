
/**
 * @apiDefine GeneralAuth
 *
 * @apiHeader {String} Authorization Breaker+space+ token
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM1ODA2NjMwLCJleHAiOjE1Mzk0MDY2MzB9.So9XNRYqzuWnfJJNhNXsw38eO14INsw4tyLsPdZKYyc"
 *      }
 *
 * @apiError (AuthenticationError) {string} Authentication Authentication error
 *
 * @apiErrorExample AuthenticationError-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "errorCode": -1,
 *        "message": "Authentication Error"
 *    }
 *
 * @apiError (AppError) {json} AppError business logic error
 * @apiError (AppError) {int} AppError.errorCode errorCode
 * @apiError (AppError) {string} AppError.message message
 *
 * @apiErrorExample AppError-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errorCode": "11000",
 *       "message": "some error message here"
 *     }
 */

/**
 * @apiDefine General
 *
 *
 * @apiError (AppError) {json} AppError business logic error
 *
 * @apiErrorExample AppError-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errorCode": "11000",
 *       "message": "some error message here"
 *     }
 */


/**
 * @apiDefine pagination
 *
 * @apiParam {int} limit
 * @apiParam {int} offset
 *
 */
