import usersRolesService from '../businessLogic/usersRolesService.js';

const authorize = (requiredRole) => {
    let requiredRoleCode;
    requiredRole === 'admin' ? requiredRoleCode = 1 : requiredRole === 'moderator' ? requiredRoleCode = 2 : requiredRoleCode = 3;
    return [
        async (req, res, next) => {
            try {
                const userRole = await usersRolesService.getRolesOfSpecificUser(req.user.id);
                if (requiredRoleCode < userRole[0] && req.user.id !== req.params.id) {
                    throw new Error('no rights');
                }
                next();
            }
            catch (err) {
                res.status(403).send(err);
            }

        }
    ]
};
export default authorize;
