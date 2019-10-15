import axios from "axios";

const actions = {
    loginUser(_, newUser) {
        axios
            .post("login", newUser)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    },
};
export default {
    actions,
};