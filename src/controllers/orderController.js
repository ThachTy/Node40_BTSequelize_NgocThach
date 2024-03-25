import connect from "../config/connect.js";
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import { checkPromises } from "../config/base.js";

const models = initModels(connect);

const orderByUser = async (req, res) => {
  try {
    let {
      userId: user_id,
      foodId: food_id,
      amount,
      code,
      arr_sub_id,
    } = req.body;
    let user = await checkPromises(models.user.findOne({ user_id }));
    let food = await checkPromises(models.food.findOne({ food_id }));
    let isOrder = await checkPromises(
      models.order.findAll({ user_id, food_id })
    );

    if (user === null) {
      responseData(res, 200, []), "KHÔNG tìm thấy người dùng";
      return;
    }

    if (food === null) {
      responseData(res, 200, []), "KHÔNG tìm thấy món ăn";
      return;
    }

    if (isOrder.length !== 0) {
      responseData(res, 200, [], "Đã được đặt");
      return;
    }

    const data = await models.order.create({
      user_id,
      food_id,
      amount,
      code,
      arr_sub_id,
    });

    responseData(res, 200, data, "Thêm món thành công");
  } catch (error) {
    console.error(new Error(error));
    responseData(res, 400, data, error);
  }
};

export { orderByUser };
