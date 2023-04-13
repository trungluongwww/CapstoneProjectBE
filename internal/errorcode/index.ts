import response from "../../external_node/ultils/response";
import user from "./user";
import address from "./address";
import upload from "./upload";
import room from "./room";
import comment from "./comment";

const init = () => {
  response.init();

  response.addListCode(user.list);

  response.addListCode(address.list);

  response.addListCode(upload.list);

  response.addListCode(room.list);

  response.addListCode(comment.list);
};

export default {
  init,
  user,
  address,
  upload,
  room,
  comment,
};
