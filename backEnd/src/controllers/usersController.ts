import Users from '../models/Users'

Users.sync({ force: true });

const usersController: any = {};

usersController.get = async () => {
};

export default usersController;
