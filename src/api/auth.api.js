import axios from "@/plugins/axios";

class Auth {
    getUsers() {
        return axios
        .get('users')
        .then((response) => {
            if (response?.data) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
    }
}

const authApi = new Auth();

export default authApi;
