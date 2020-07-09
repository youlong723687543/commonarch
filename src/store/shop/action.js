export default {
  shopAction(ctx, item) {
    ctx.commit("shopMutation", item);
  }
};
