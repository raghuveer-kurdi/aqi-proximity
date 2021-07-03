import React, { useState } from "react";
import moment from "moment";
import { Select } from "antd";
import { useSelector } from "react-redux";
import _, { last } from "lodash";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./AoiCompTile.css";
import { Aqi } from "../../Modals/Common";
const { Option } = Select;
const AoiCompTile = (props: any) => {
  const [historic, latestCityInfo] = useSelector((state: any) => [
    state.aqi.historic,
    state.aqi.cities,
  ]);
  const [selCities, setSelCities] = useState<string[]>([]);
  const cities = Object.keys(historic);
  const [graphData, setGraphData] = useState<any>([]);
  const updateCities = (cities: string[]) => {
    const allCityRec: any = [],
      graphData: any = [],
      oldAqi: any = {};
    cities.forEach((city: string) => {
      allCityRec.push(...historic[city]);
      oldAqi[city] = undefined;
    });
    _.chain(allCityRec)
      .groupBy((rec: any) => rec.lastUpdated)
      .forIn((cityRecs, lastUpdated) => {
        const gData: any = {
          lastUpdated: moment(lastUpdated).format("hh:mm:ss"),
          ...oldAqi,
        };
        _.each(cityRecs, (rec: Aqi) => {
          gData[rec.city] = rec.aqi;
          oldAqi[rec.city] = rec.aqi;
        });
        console.log(gData)
        graphData.push(gData);
      })
      .value();
    setGraphData(graphData);
    setSelCities(cities);
  };

  return (
    <div className="compare-tile-wrapper">
      <h2>AQI Comparision</h2>
      <div className="city-sel-wrapper">
        <Select
          className="city-dropdown"
          mode="multiple"
          value={selCities}
          placeholder="Multiple city selection"
          onChange={updateCities}
        >
          {cities.map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>
      {!selCities.length ? (
        <h3>Please select one or more cities for Comparision</h3>
      ) : (
        <LineChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="lastUpdated" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selCities.map((city) => {
            const rand = Math.random() * 256;
            return (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={latestCityInfo[city].color}
              />
            );
          })}
        </LineChart>
      )}
    </div>
  );
};

export default AoiCompTile;
