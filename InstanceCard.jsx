import React from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
import "./InstancesStyling.css";

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
                        title: "Delete Successful"
                    })
                    this.props.onHandleDelete(this.props.survey);
                    console.log("Look in InstanceCard - handleDelete", this.props.survey)
                } else {
                    swal({
                        title: "Woo That was a close one!",
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
            month: "short",
            day: "numeric",
            year: "numeric",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit"
        };
        return new Date(date).toLocaleTimeString(undefined, timeOption);
    };
    return (
        <div className="col-lg-4 mt-1">
            <div className="card ">
                <div className="card-header">
                    <div className="ribbon ribbon-clip ribbon-primary ribbonExtras">
                        <h6>{props.survey.survey.name}</h6>
                    </div>
                </div>
                <div className="card-body">
                    <div className="max-lines">
                        <p id="instanceText"><b>Created on </b>{formatTime(props.survey.dateCreated)}</p>
                        <p id="instanceText"><b>Last Modified on </b>{formatTime(props.survey.dateModified)}</p>
                    </div>
                    <div className="padding row">
                        <div className="col-6 btn-padding">
                            <button className="btn btn-pill btn-info " onClick={handleView}>View More</button>
                        </div>
                        <div className="col-6 btn-padding">
                            <button className="btn btn-pill btn-danger " onClick={handleDelete} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
InstanceCard.propTypes = {
    survey: PropTypes.shape({
        id: PropTypes.number,
        surveyId: PropTypes.number,
        userId: PropTypes.number,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
        survey: PropTypes.object,
        userProfile: PropTypes.object
    }),
    onHandleView: PropTypes.func,
    onHandleDelete: PropTypes.func
};
export default InstanceCard;
