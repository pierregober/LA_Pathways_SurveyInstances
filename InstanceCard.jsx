import React from "react"
import PropTypes from 'prop-types'
import swal from 'sweetalert';
import "./InstancesStyling.css"

const InstanceCard = props => {
    const handleDelete = () => {
        swal("Are you sure that you want to delete this survey?", {
            icon: "warning",
            buttons: {
                cancel: "No Sorry!",
                catch: {
                    text: "Yes DELETE!",
                    value: "delete",
                },
            },
        })
            .then((value) => {
                if (value === 'delete') {
                    swal({
                        icon: "success",
                        title: "Delete Successful!"
                    })
                    this.props.onHandleDelete(this.props.survey);
                    console.log("Look in InstanceCard - handleDelete",this.props.survey)
                } else {
                    swal({
                        title: "Woo That was a close one! ;)",
                        button: false
                    })
                }
            })
    }
    const handleView = () => {
        console.log("Look in InstanceCard - handleView", props.survey)
        props.onHandleView(props.survey);
    }
    const formatTime = date => {
        let timeOption = {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short"
        };
        return new Date(date).toLocaleTimeString(undefined, timeOption);
    };

    return (
        <div className="row">
            <div className=" card col-lg-11 align-items-stretch">
                <div className="card">
                    <div className="card-header bg-dark">
                        <h5>{props.survey.survey.name}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card3"><b>{props.survey.userProfile.firstName + " "}{props.survey.userProfile.lastName + " "}</b>
                            created on {formatTime(props.survey.dateCreated)}</p>
                        <p className="card3">Last modified on {formatTime(props.survey.dateModified)}</p>
                    </div>
                    <div id="centerIt">
                        <button id="btnStyler" className="btn btn-info" onClick={handleView}>View More</button>
                        <button id="btnStyler" className="btn btn-danger" onClick={handleDelete} >Delete</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

InstanceCard.propTypes = {
    survey: PropTypes.shape({
        id: PropTypes.number
        , surveyId: PropTypes.number
        , userId: PropTypes.number
        , dateCreated: PropTypes.string
        , dateModified: PropTypes.string
        , survey: PropTypes.object
        , userProfile: PropTypes.object
    }),
    onHandleView: PropTypes.func,
    onHandleDelete: PropTypes.shape({
        survey: PropTypes.object
    })
};
export default InstanceCard
