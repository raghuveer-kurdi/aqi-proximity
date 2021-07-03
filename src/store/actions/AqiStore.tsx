export const TYPES = {
  SET_AQI_NEW_DATA: "SET_AQI_NEW_DATA",
};

export const setNewAqiData = (payload: {}) => ({
  type: TYPES.SET_AQI_NEW_DATA,
  payload,
});
