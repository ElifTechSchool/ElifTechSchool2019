import axios from "axios";

const actions = {
    loginUser(_, newUser) {
        return axios
            .post("login", newUser)
            .then(res => res)
            .catch(err => err);
    },
};
export default {
    actions,
};