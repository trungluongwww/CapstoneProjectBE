import response from "../../external_node/ultils/response";
import user from "./user";
import address from "./address";
import upload from "./upload";

const init = () => {
  response.init();

  response.addListCode(user.list);

  response.addListCode(address.list);

  response.addListCode(upload.list);
};

export default {
  init,
  user,
  address,
  upload,
};
