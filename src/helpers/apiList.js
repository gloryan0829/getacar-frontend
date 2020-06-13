import apiCall from './apiCall';
import { SERVER_API_BASE } from '../constants/environments';

export const getBrandList = () => {
  return apiCall(`${SERVER_API_BASE}/car/brand/list`)
};

export const getModelList = (brandCode) => {
  return apiCall(`${SERVER_API_BASE}/car/${brandCode}/model/list`)
}

export const getModelOne = (modelCode) => {
    return apiCall(`${SERVER_API_BASE}/car/model/${modelCode}`)
}

export const saveRequestEstimate = (estimateInfo) => {
    return apiCall(`${SERVER_API_BASE}/car/estimate`, 'post', {
        ...estimateInfo
    });
}

export const getEstimateOne = (id) => {
    return apiCall(`${SERVER_API_BASE}/car/estimate`, 'get', {
        id
    });
}

export const confirmedEstimate = (id) => {
    return apiCall(`${SERVER_API_BASE}/car/estimate`, 'put', {
        id
    });
}