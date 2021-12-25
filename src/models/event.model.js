import axios from "axios"

const baseURL = 'http://localhost:8000/api/event/';

export const addEvent = async (data) => {
  try {
    const response = await axios.post(`${baseURL}create`,data);
    return response;
  } catch(err){
    console.log("Error", err);
  }
}

export const getEvent = async () => {
  try {
    const response = await axios.get(`${baseURL}get`);
    return response;
  } catch(err){
    console.log("Error", err);
  }
}

export const editEvent = async (id, data) => {
  try {
    const response = await axios.put(`${baseURL}edit/${id}`, data);
    return response;
  } catch(err){
    console.log("Error", err.response);
  }
}

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}delete/${id}`);
    return response;
  } catch(err){
    console.log("Error", err);
  }
}

export const deleteMultipleEvent = async (data) => {
  try {
    const response = await axios.post(`${baseURL}delete`, data);
    return response;
  } catch(err){
    console.log("Error", err);
  }
}

export const uploadImage = async (data) => {
  try {
    const response = await axios.post(`${baseURL}image_upload`, data);
    return response;
  } catch(err){
    console.log("Error", err);
  }
}