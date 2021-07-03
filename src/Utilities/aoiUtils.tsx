const AQI_RANGE = [
  { min: 0, max: 50, band: "GOOD", color: "green" },
  { min: 51, max: 100, band: "SATISFACTORY", color: "lightgreen" },
  { min: 101, max: 200, band: "MODERATE", color: "yellow" },
  { min: 201, max: 300, band: "POOR", color: "orange" },
  { min: 301, max: 400, band: "VERY POOR", color: "red" },
  { min: 401, max: 500, band: "SEVERE", color: "darkred" },
];

const between = (num: Number, min: Number, max: Number) =>
  num >= min && num <= max;

export const findAqiBand = (aqiIndex: Number) => {
  let aqiBand = null;
  for (const aqiRange of AQI_RANGE) {
    if (between(aqiIndex, aqiRange.min, aqiRange.max)) {
      aqiBand = { ...aqiRange };
      break;
    }
  }
  return aqiBand ? aqiBand : AQI_RANGE[AQI_RANGE.length - 1];
};

export const getRandomDigits = () => {
  
}