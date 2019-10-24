import axios from "axios";

const state = {
    forgotPassDialog: false,
}

const actions = {
    forgotPass({ dispatch }, email) {
        return axios
            .post('users/passwords', email)
            .then(res => {
                if (res.status === 200) {
                    dispatch("showSnackBar", { response: "Message sent", color: "primary" });
                }
            })
            .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
    },
    changePasswordToken({ dispatch }, data) {
        return axios
            .put('/users/passwords', data)
            .then(res => {
                if (res.status === 204) {
                    dispatch("showSnackBar", { response: "Password changed", color: "primary" });
                }
            })
            .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
    },
}

export default {
    state,
    actions,
};