import UserService from "../service/user.service";
const userService = new UserService();

class UserController {
    async Login(req, res, next){
        try{
            const {login, password} = req.body;
            const response = await userService.login(login, password);
            return res.json(response.rows)
        }
    }
}