import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as eventModel from "../../models/event.model";
import "./edit_event.screen.scss";
import { toast } from "react-toastify";

const EditEvent = (props) => {
  const data = useSelector((state) => state.event);
  const dispatch = useDispatch();
  console.log("props",props);
  const [state, setState] = useState({
    name: data ? data.event.name : "",
    location: data ? data.event.location : "",
    startDate: data ? moment(data.event.start_date).format("YYYY-MM-DD") : "",
    endDate: data ? moment(data.event.end_date).format("YYYY-MM-DD") : "",
    banner: data ? data.event.banner : "",
  });
  
  useEffect(() => {
    const { name, location, startDate, endDate, banner } = state;
    setState({ ...state, name: name , location, startDate, endDate, banner });
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const getAllEvent = async () => {
    try {
      const event = await eventModel.getEvent();
      dispatch({
        type: "EVENT_LIST",
        payload: event.data.data,
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  const onUpdate = async () => {
    try {
      const data = {
        name: state.name,
        location: state.location,
        start_date: new Date(state.startDate).toISOString(),
        end_date: new Date(state.endDate).toISOString(),
        banner: state.banner
      };
      const event = await eventModel.editEvent(props.match.params.id, data);
      await getAllEvent();
      toast.success("Event is edited successfully");
      props.history.push('/')
      console.log("Event", event);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fileUpload = async (e) => {
    try {
      const data = new FormData();
      const ext = e.target.files[0].name.split(".").pop();
      const filename = e.target.files[0].name.split(".")[0].replace(/ /g, "");
      const newFileName = `${filename}${Date.now()}.${ext}`;
      const newFile = new File([e.target.files[0]], newFileName);
      data.append('file', newFile);
      const response = await  eventModel.uploadImage(data);
      setState({ ...state, banner: response.data.data });
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="edit_event_container">
      <div className="edit_event_wrapper">
        <div className="edit_event_header">
          <h1>Edit Event</h1>
        </div>
        <div className="edit_event_input_wrapper">
          <div>Name</div>
          <input
            className="edit_event_input"
            value={state.name}
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="edit_event_input_wrapper">
          <div>Location</div>
          <textarea
            className="edit_event_textarea"
            onChange={onChange}
            name="location"
            value={state.location}
          />
        </div>
        <div className="edit_event_input_wrapper">
          <div>Start Date</div>
          <input
            className="edit_event_input"
            onChange={onChange}
            name="startDate"
            type="date"
            value={state.startDate}
          />
        </div>
        <div className="edit_event_input_wrapper">
          <div>End Date</div>
          <input
            className="edit_event_input"
            onChange={onChange}
            name="endDate"
            type="date"
            value={state.endDate}
          />
        </div>
        <div className="edit_event_input_wrapper">
          <div>Banner</div>
          <input
            className="edit_event_input"
            onChange={fileUpload}
            name="banner"
            type="file"
            // value={state.banner}
          />
          {state.banner.length !==0 && 
            <img src={state.banner} alt="banner" className="banner_image" />
          }
        </div>
        <div className="edit_event_input_wrapper">
          <input
            className="edit_event_input"
            onClick={onUpdate}
            name="banner"
            type="button"
            value="Update"
          />
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
