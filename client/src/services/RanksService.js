import axios from "axios";

const getRanks = async () => {
  try {
    const response = await axios.get("ranks");
    return response;
  } catch (error) {
    //for test, should added errorHandler
    console.log(error);
  }
};

const addRank = async rank => {
  try {
    const response = await axios.post("ranks", rank);
    return response;
  } catch (error) {
    //for test, should added errorHandler
    console.log(error);
  }
};

const getRankById = async id => {
  try {
    const response = await axios.get(`ranks/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateRank = async (id, rank) => {
  try {
    const response = await axios.put(`ranks/${id}`, rank);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteRank = async id => {
  try {
    const response = await axios.delete(`ranks/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getRanks,
  addRank,
  getRankById,
  updateRank,
  deleteRank
};
