import { Aqi } from "../../Modals/Common";
import _ from "lodash";
import { TYPES } from "../actions/AqiStore";

const randomRgb = () => Math.floor(Math.random() * 256);

const INITIAL_STATE = { cities: {}, historic: {} };
const reducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case TYPES.SET_AQI_NEW_DATA:
      const cities: any = { ...state.cities };
      const historic: any = { ...state.historic };
      action.payload.data.forEach((aqData: Aqi) => {
        const newUpdatedData = {
          ...aqData,
          lastUpdated: new Date(),
          aqi: aqData.aqi.toFixed(2),
          color: `rgb(${randomRgb()},${randomRgb()},${randomRgb()})`,
        };
        if (!cities[aqData.city]) {
          cities[aqData.city] = newUpdatedData;
          historic[aqData.city] = [
            {
              ...newUpdatedData,
            },
          ];
        } else {
          cities[aqData.city] = {
            ...newUpdatedData,
            color: cities[aqData.city].color,
          };
          historic[aqData.city].push({
            ...newUpdatedData,
            color: cities[aqData.city].color,
          });
        }
      });
      return { ...state, cities, historic };
    default:
      return state;
  }
};
export default reducer;
