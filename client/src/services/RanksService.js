import axios from "axios";

const getRanks = async () => {
  try {
    const response = await axios.get("ranks");
    console.log(response)
    return response;
  } catch (error) {
    //for test, should added errorHandler
    console.log(error);
  }
};

const addRank = async rank => {
  try {
    const response = await axios.post("ranks", rank);
    return response.data;
  } catch (error) {
    //for test, should added errorHandler
    console.log(error);
  }
};

export default {
  getRanks,
  addRank
};
