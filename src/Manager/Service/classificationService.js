import { async } from "q";
import axiosInstance from "../../Middleware/jwtInterceptor";

const fetchClassifications = async () => {
  const result = await axiosInstance.get("classifications");
  return result.data;
};
const getbyClassification = async (code) => {
  var result = await axiosInstance.get(`classifications/${code}`);
  return result;
};
const addClassification = async (classificationDto) => {
  var result = await axiosInstance.post("classifications", classificationDto);
  return result;
};

const getClassificationDataTypes = () => {
  const data = [
    { code: "0", name: "Metinsel Değer", optionsVisible: false },
    { code: "1", name: "Sayısal Değer", optionsVisible: false },
    { code: "2", name: "Mantıksal Değer", optionsVisible: false },
    { code: "3", name: "Seçim", optionsVisible: true },
    { code: "4", name: "Çoklu Seçim", optionsVisible: true },
  ];
  return data;
};
const updateClassifications = async (classificationDto) => {
  const result = await axiosInstance.put("classifications", classificationDto);
  return result;
};
const deleteClassifications = async (code) => {
  const result = await axiosInstance.delete(`classifications/${code}`);
  return result;
};

const exportFunction = {
  fetchClassifications,
  addClassification,
  updateClassifications,
  deleteClassifications,
  getClassificationDataTypes,
  getbyClassification,
};

export default exportFunction;
