/*  Like Controller */
import initModels from "../models/init-models.js";
import sequelize from "../config/connect.js";
import { responseData } from "../config/response.js";
import { checkPromises } from "../config/base.js";
const models = initModels(sequelize);

// RATE rest
const rateRest = async (req, res) => {
  try {
    let { userId: user_id, resId: res_id, amount } = req.body;
    let user = await checkPromises(models.user.findByPk(user_id));
    let restau = await checkPromises(models.restaurant.findByPk(res_id));
    let isRate = await checkPromises(
      models.rate_res.findAll({ where: { user_id, res_id } })
    );

    // kiểm tra user
    if (user === null) {
      responseData(res, 200, [], "Không tìm thấy NGƯỜI DÙNG");
      return;
    }
    // kiểm tra nhà hàng
    if (restau === null) {
      restau === null && responseData(res, 200, [], "Không tìm thấy NHÀ HÀNG");
      return;
    }

    // kiểm tra likes
    if (isRate.length !== 0) {
      responseData(res, 200, [], "Đã Đánh Giá rồi");
      return;
    }

    // Thêm RATE vòa db
    let rate = await checkPromises(
      models.rate_res.create({
        user_id,
        res_id,
        amount,
        date_rate: new Date(),
      })
    );

    rate && responseData(res, 200, [rate], "Đã ĐÁNH GIÁ thành công");
  } catch (error) {
    console.error(error);
    responseData(res, 400, [], error);
  }
};

// Get Rest By res_id
const getRestaurantsByRestId = async (req, res) => {
  try {
    let { resId: res_id } = req.body;

    let listRest = await checkPromises(
      models.rate_res.findAll({
        include: ["rest"],
        where: { res_id },
      })
    );

    if (listRest.length === 0) {
      responseData(res, 200, [], "KHÔNG tìm thấy danh sách NHÀ HÀNG");
      return;
    }
    responseData(res, 200, [...listRest], "Danh sách NHÀ HÀNG");
  } catch (error) {
    console.error(error);
    responseData(res, 400, [], error);
  }
};

// Get User By user_id
const getUsersByUserId = async (req, res) => {
  try {
    let { userId: user_id } = req.body;
    let listUser = await checkPromises(
      models.rate_res.findAll({
        include: ["user"],
        where: { user_id },
      })
    );

    if (listUser.length === 0) {
      responseData(res, 200, [], "KHÔNG tìm thấy danh sách NGƯỜI DÙNG");
      return;
    }
    responseData(res, 200, [...listUser], "Đã tìm thấy Danh sách NGƯỜI DÙNG");
  } catch (error) {
    console.error(error);
    responseData(res, 400, [], error);
  }
};

export { rateRest, getRestaurantsByRestId, getUsersByUserId };
