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
    mappedInstance: []
  };
  baseState = this.state;

  componentDidMount() {
    _logger("componentDidMount");
    SurveyInstance.getAll(0, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onGetInstanceError);
  }

  onGetInstanceSuccess = data => {
    console.log("Check onGetInstanceSuccess", data);
    let survey = data.item.pagedItems;
    let totalPageCount = data.item.totalCount;
    this.setState({
      mappedInstance: survey.map(this.mapInstance),
      total: totalPageCount
    });
  };

  onGetInstanceError = data => {
    console.log("Check GetInstanceError", data);
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
    this.props.history.push(`/survey/instance/${survey.id}/viewmore/`, survey);
  };
  onViewSuccess = data => {
    console.log("onViewSuccess", data);
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
    console.log("onDeleteFailure", response);
  };

  onChange = current => {
    console.log("onChange:current=", current);
    this.setState({ mappedInstance: [] });
    SurveyInstance.getAll(current - 1, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onGetInstanceError);
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
    SurveyInstance.getAll(0, 6)
      .then(this.onGetInstanceSuccess)
      .catch(this.onGetInstanceError);
  };

  render() {
    return (
      <React.Fragment>
        <div id="centerIt">
          <div className="divider" />
          <div id="pushRight">
            <form onSubmit={this.onDateRange}>
              <div id="pushRight" className="row">
                <h6 id="centerText">Filter From:</h6>
                <div className="col-md-2">
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
                <div className="col-md-2">
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
                  id="centerText"
                  type="button"
                  className="btn btn-info btn-xs"
                  onClick={this.dateRanger}
                >
                  <a>
                    {" "}
                    <span className="fa fa-search"></span>
                  </a>
                </button>

                <button
                  id="centerText"
                  type="reset"
                  className="btn btn-danger btn-xs"
                  onClick={this.resetFilter}
                >
                  <a>
                    {" "}
                    <span className="fa fa-undo"></span>
                  </a>
                </button>
              </div>
            </form>
          </div>

          <div className="card-columns">{this.state.mappedInstance}</div>
        </div>
        <div className="pagination">
          <div className="mx-auto">
            <Pagination
              showTotal={total => `Total ${total} items`}
              showSizeChanger={true}
              defaultPageSize={6}
              defaultCurrent={1}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChange}
              total={this.state.total}
              locale={localeInfo}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Instances.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
}
export default Instances;
