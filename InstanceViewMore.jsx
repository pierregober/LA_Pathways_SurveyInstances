import React from "react"
import PropTypes from 'prop-types'
import * as SurveyInstance from "../../services/surveyInstanceService"
import InstanceViewMoreCard from "./InstanceViewMoreCard"
import { Link } from "react-router-dom";

class InstanceViewMore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mappedView: []
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        let id = this.props.match.params.id
        SurveyInstance.getById(id)
            .then(this.onViewSuccess)
            .catch(this.onViewFailure)
    }
    onViewSuccess = data => {
        console.log("OnViewSuccess", data.item)
        let surveyTest = data.item.questions
        console.log(surveyTest)
        this.setState({
            mappedView: surveyTest.map(this.mapView)
        })
        console.log(this.state.mappedView, "Here's the mappedView data")
    }
    mapView = (survey, index) =>
        < InstanceViewMoreCard
            key={index}
            survey={survey}
        />

    onViewFailure = data => {
        console.log("OnViewFailure", data)
    }

    handleViewer = () => {
        console.log("This right here")
    }
    render() {
        return (
            <React.Fragment>
                <button className="btn btn-dark">
                    <Link
                        to={`/survey/instances`}>Go Back
                    </Link>
                </button>
                <div>
                    {this.state.mappedView}
                </div>
            </React.Fragment>
        )
    }
}
InstanceViewMore.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.object
    }),
    match: PropTypes.shape({
        params: PropTypes.object
    })
}
export default InstanceViewMore
