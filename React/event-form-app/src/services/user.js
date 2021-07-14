import axios from "axios";

const url = "http://localhost:4200/users";

const getAll = async () => {
    const request = await axios.get(url);
    return request.data;
};

const create = async (newObject) => {
    const request = await axios.post(url, newObject);
    return request.data;
};

export default { getAll, create };
