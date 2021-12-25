import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as eventModel from "../../models/event.model";
import "./add_event.screen.scss";

const AddEvent = (props) => {
  const data = useSelector((state) => state);
  const [state, setState] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    banner: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "TEST_ACTION",
      payload: "Sunil",
    });
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    try {
      const data = {
        name: state.name,
        location: state.location,
        start_date: state.startDate,
        end_date: state.endDate,
        banner: state.banner
      };
      const event = await eventModel.addEvent(data);
      console.log("Event", event);
      toast.success("Event created successfully");
      props.history.push("/");
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
      console.log("response", response);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="add_event_container">
      <div className="add_event_wrapper">
        <div className="add_event_header">
          <h1>Create Event</h1>
        </div>
        <div className="add_event_input_wrapper">
          <div>Name</div>
          <input
            className="add_event_input"
            value={state.name}
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="add_event_input_wrapper">
          <div>Location</div>
          <textarea
            className="add_event_textarea"
            onChange={onChange}
            name="location"
          />
        </div>
        <div className="add_event_input_wrapper">
          <div>Start Date</div>
          <input
            className="add_event_input"
            onChange={onChange}
            name="startDate"
            type="date"
          />
        </div>
        <div className="add_event_input_wrapper">
          <div>End Date</div>
          <input
            className="add_event_input"
            onChange={onChange}
            name="endDate"
            type="date"
          />
        </div>
        <div className="add_event_input_wrapper">
          <div>Banner</div>
          <input
            className="add_event_input"
            onChange={fileUpload}
            name="banner"
            type="file"
          />
          {state.banner.length !==0 && 
            <img src={state.banner} alt="banner" className="banner_image" />
          }
        </div>
        <div className="add_event_input_wrapper">
          <input
            className="add_event_input"
            onClick={onClick}
            name="banner"
            type="button"
            value="Create"
          />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
