import React from "react";
import * as SurveyInstance from "../../services/surveyInstanceService";
import SurveyInstanceCard from "./InstanceCard";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import "./InstancesStyling.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Instances extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    mappedInstance: [],
    current: 1
  };
  baseState = this.state;

  componentDidMount() {
    console.log("componentDidMount");
    SurveyInstance.getAll(0, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onGetInstanceError);
  }

  onGetInstanceSuccess = data => {
    console.log("onGetInstanceSuccess", data);
    let survey = data.item.pagedItems;
    let totalPageCount = data.item.totalCount;
    this.setState({
      mappedInstance: survey.map(this.mapInstance),
      total: totalPageCount
    });
  };

  onGetInstanceError = data => {
    console.log("FATAL ERROR go and check GetInstanceError", data);
  };

  mapInstance = survey => (
    <SurveyInstanceCard
      key={survey.id}
      survey={survey}
      onHandleView={this.onHandleView}
      onHandleDelete={this.onHandleDelete}
    />
  );

  onHandleView = survey => {
    console.log("You got to onHandleView");
    this.props.history.push(`/admin/survey/instance/${survey.id}/viewmore/`, survey);
  };
  onViewSuccess = data => {
    console.log(data);
  };

  onHandleDelete = survey => {
    console.log("onHandleDelete", survey.id);
    SurveyInstance.deleteById(survey.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteFailure);
  };

  onDeleteSuccess = response => {
    console.log("onDeleteSuccess", response);
  };
  onDeleteFailure = response => {
    console.log("Fatal error the delete did not work.... try again", response);
  };

  onChange = current => {
    console.log("onChange:current=", current);
    this.setState({ mappedInstance: [], current: current });
    if (this.state.startDate) {
      SurveyInstance.dateRange(this.state.startDate, this.state.endDate, current - 1, 6)
        .then(this.onGetInstanceSuccess)
        .catch(this.onRangeFail);
    } else {
      SurveyInstance.getAll(current - 1, 6)
        .then(this.onGetInstanceSuccess)
        .catch(this.onGetInstanceError);
    }
  };

  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  dateRanger = e => {
    console.log(e);
    e.preventDefault();
    SurveyInstance.dateRange(this.state.startDate, this.state.endDate, 0, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onRangeFail);
  };

  onRangeFail = () => {
    toast.error("No Surveys Found Within Range");
    SurveyInstance.getAll(0, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onGetInstanceError);
  };

  resetFilter = () => {
    this.setState(this.baseState);
    this.setState(() => { return { current: 1 } });
    SurveyInstance.getAll(this.state.current, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onGetInstanceError);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="divider" />
          <div id="pushRight">
            <div className="row">
              <div className="col">
                <form onSubmit={this.onDateRange}>
                  <div id="pushRight" className="row">
                    <h6 id="centerText">Filter From:</h6>
                    <div className="col-am">
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={this.state.startDate}
                        required
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <h6 id="centerText">To</h6>
                    <div className="col-am">
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={this.state.endDate}
                        required
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <button
                      id="btnPadder"
                      type="button"
                      className="btn btn-pill btn-success"
                      onClick={this.dateRanger}
                    >
                      <a>
                        {" "}
                        <span className="fa fa-search"></span>
                      </a> Filter
                </button>
                    <button
                      id="btnPadder"
                      type="reset"
                      className="btn btn-pill btn-secondary"
                      onClick={this.resetFilter}
                    >
                      <a>
                        {" "}
                        <span className="fa fa-undo"></span>
                      </a> Reset
                </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.mappedInstance}
          </div>
          <div className="row">
            <div className="col">
              <div className="pagination">
                <div className="mx-auto">
                  <Pagination
                    showTotal={total => `Total ${total} items`}
                    showSizeChanger={true}
                    defaultPageSize={6}
                    defaultCurrent={1}
                    current={this.state.current}
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={this.onChange}
                    total={this.state.total}
                    locale={localeInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Instances.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};
export default Instances;
