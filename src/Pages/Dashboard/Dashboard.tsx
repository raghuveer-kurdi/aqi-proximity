import React from "react";
import AoiTile from "../../Components/AoiTile/AoiTile";
import AoiCompTile from "../../Components/AoiCompTile/AoiCompTile";
import { setNewAqiData } from "../../store/actions/AqiStore";
import { connect } from "react-redux";
import "./Dashboard.css";

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { dataSource: [] };
  }

  componentDidMount() {
    const ws = new WebSocket("ws://city-ws.herokuapp.com/");
    ws.addEventListener("open", () => console.log("connected"));
    ws.addEventListener("message", (data) => {
      this.props.setNewAqiData({ data: JSON.parse(data.data) });
    });
  }

  render() {
    return (
      <div className="tiles-wrapper">
        <AoiTile dataSource={Object.values(this.props.cities)} />
        <AoiCompTile/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  cities: state.aqi.cities,
});

const mapActionsToProps = (dispatch: any) => ({
  setNewAqiData: (payload: any) => dispatch(setNewAqiData(payload)),
});

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
