import React from "react"
import PropTypes from 'prop-types'

const InstanceViewMoreCard = props => {
    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>{props.survey.question}</h5>
                            <br />
                            <div>
                                {props.survey.answers
                                    ? props.survey.answers.map((answer, indx) =>
                                        (<p key={indx}><b>Answer# {indx + 1}:</b> {answer.answerValues.map(text => text.answerText)} </p>))
                                    : <p>No Answers Were Provided</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
InstanceViewMoreCard.propTypes = {
    survey: PropTypes.shape({
        id: PropTypes.number
        , question: PropTypes.string
        , answers: PropTypes.array
    })
}
export default InstanceViewMoreCard
