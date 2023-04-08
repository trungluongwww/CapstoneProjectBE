import response from "../../external_node/ultilities/response";
import user from "./user";
import address from "./address";

const init = () => {
    response.init()

    response.addListCode(user.list)

    response.addListCode(address.list)
}

export default {
    init,
    user,
    address,
}