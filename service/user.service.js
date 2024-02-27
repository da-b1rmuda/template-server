import client from "../db.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
  async login(login, password) {
    const response = await client.query(
      `
        select login, password from test where login = $1 and password = $2
        `,
      [login, password]
    );
    //Опцианально (необязательно)
    //Проверяет есть ли такой пользователь в бд, если нет ничего не отправляет на клиент
    if (response.rows[0] === null || response.rows[0] === undefined) {
      throw ApiError.BadRequest("Неправильный логин или пароль");
    }
    return response;
  }

  async getUsers() {
    const response = await client.query(
      `
        select * from test
        `
    );
    return response;
  }
}

export default UserService;
