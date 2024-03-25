/*  Like Controller */
import initModels from "../models/init-models.js";
import sequelize from "../config/connect.js";
import { responseData } from "../config/response.js";
import { checkPromises } from "../config/base.js";

const models = initModels(sequelize);

// Post Like || Unlike restaurant
const postLikeRest = async (req, res) => {
  /* */
  try {
    let { userId: user_id, resId: res_id } = req.body;
    let user = await checkPromises(models.user.findByPk(user_id));
    let rest = await checkPromises(models.restaurant.findByPk(res_id));
    let isLike = await checkPromises(
      models.like_res.findAll({ where: { user_id, res_id } })
    );
    // kiểm tra user
    if (user === null) {
      responseData(res, 200, [], "Không tìm thấy NGƯỜI DÙNG");
      return;
    }
    // kiểm tra nhà hàng
    if (rest === null) {
      rest === null && responseData(res, 200, [], "Không tìm thấy NHÀ HÀNG");
      return;
    }

    // kiểm tra likes
    if (isLike.length !== 0) {
      let unLike = await checkPromises(
        models.like_res.destroy({
          where: { user_id, res_id },
        })
      );
      unLike && responseData(res, 200, [], "Đã UNLIKE thành công");
      return;
    }
    // Thêm LIKE vòa db
    let like = await checkPromises(
      models.like_res.create({
        user_id: user_id,
        res_id: res_id,
        date_like: new Date(),
      })
    );

    like && responseData(res, 200, [], "Đã LIKE thành công");
  } catch (error) {
    console.error(error);
    responseData(res, 400, [], error);
  }
};

// Get Like_Res By res_id
const getRestaurantsByRestId = async (req, res) => {
  /* */
  try {
    let { resId: res_id } = req.params;

    let listRest = await checkPromises(
      models.like_res.findAll({
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
  /* */
  try {
    let { userId: user_id } = req.params;

    let listUser = await checkPromises(
      models.like_res.findAll({
        include: ["user"],
        where: { user_id },
      })
    );

    if (listUser.length === 0) {
      responseData(res, 200, [], "KHÔNG tìm thấy danh sách USER");
      return;
    }
    responseData(res, 200, [...listUser], "Đã tìm thấy Danh sách USER");
  } catch (error) {
    console.error(error);
    responseData(res, 400, [], error);
  }
};

export { postLikeRest, getRestaurantsByRestId, getUsersByUserId };
