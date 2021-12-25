import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventModel from "../../models/event.model";
import tick from "../../assets/icons/Tick_White.svg";
import moment from "moment";
import plus from "../../assets/icons/Plus_White.svg";
import pdf from "../../assets/icons/pdf.svg";
import "./list_event.screen.scss";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

const ListEvent = (props) => {
  const data = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    checkbox: false,
    index: 0,
    selectedIndex: [],
    selectedEventId: [],
    selectedEvent: [],
  });

  useEffect(() => {
    getAllEvent();
  }, []);

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

  const getIndex = (index) => {
    let tempArray = state.selectedIndex;
    if (tempArray.indexOf(index) !== -1) {
      const listIndex = tempArray.indexOf(index);
      tempArray.splice(listIndex, 1);
      setState({ ...state, selectedIndex: tempArray });
    } else {
      tempArray.push(index);
      setState({ ...state, selectedIndex: tempArray });
    }
  };

  const onEdit = async (data) => {
    try {
      dispatch({
        type: "GET_SINGLE_EVENT",
        payload: data,
      });
      props.history.push(`/edit/${data._id}`);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const onDelete = async (id) => {
    try {
      const event = await eventModel.deleteEvent(id);
      toast.success("Event deleted successfully");
      await getAllEvent();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const eventSelected = state.selectedIndex.map((m, index) => {
    let result = data && data?.eventList[m];
    return result;
  });

  const onDeleteEvent = async () => {
    try {
      const selectedIds = state.selectedIndex.map((m, index) => {
        let result = data && data?.eventList[m]._id;
        return result;
      });
      const selectedEventIds = {
        data: selectedIds,
      };
      const event = await eventModel.deleteMultipleEvent(selectedEventIds);
      setState({ ...state, selectedIndex: [] });
      await getAllEvent();
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="list_event_container">
      <div className="list_event_wrapper">
        <div className="list_event_header">
          <h1>List Event</h1>
          <div
            className="list_event_create"
            onClick={() => props.history.push("/add")}
          >
            <img src={plus} alt="Logo" />
          </div>
          <div className="list_event_multiple_delete">
            <input
              className="list_event_delete_button"
              onClick={() => onDeleteEvent()}
              name="banner"
              type="button"
              value="Delete Event"
            />
          </div>
          <div className="list_event_export">
            <CSVLink
              data={eventSelected}
              filename={"my-file.csv"}
              className="btn btn-primary"
              target="_blank"
            >
            <img src={pdf} alt="Logo" className="pdf_image" />
            </CSVLink>
          </div>
        </div>
        <table style={{ width: "100%" }}>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Location</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th></th>
            <th></th>
          </tr>
          {data?.eventList.map((list, index) => (
            <tr>
              <th>
                <div className="list_event_all_event">
                  {state.selectedIndex.includes(index) ? (
                    <div
                      className="list_event_checkbox_active_wrapper"
                      onClick={() => {
                        setState({
                          ...state,
                          checkbox: !state.checkbox,
                          index: index,
                        });
                        getIndex(index);
                      }}
                    >
                      <div className="list_event_checkbox">
                        <img src={tick} alt="Logo" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="list_event_checkbox_inactive_wrapper"
                      onClick={() => {
                        setState({
                          ...state,
                          checkbox: !state.checkbox,
                          index: index,
                        });
                        getIndex(index);
                      }}
                    >
                      <div className="list_event_checkbox">
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>{list.name}</th>
              <th>{list.location}</th>
              <th>{moment(list.start_date).format("DD-MM-YYYY")}</th>
              <th>{moment(list.end_date).format("DD-MM-YYYY")}</th>
              <th>
                <div className="list_event_edit">
                  <input
                    className="list_event_edit_button"
                    onClick={() => onEdit(list)}
                    name="banner"
                    type="button"
                    value="Edit"
                  />
                </div>
              </th>
              <th>
                <div className="list_event_delete">
                  <input
                    className="list_event_delete_button"
                    onClick={() => onDelete(list._id)}
                    name="banner"
                    type="button"
                    value="Delete"
                  />
                </div>
              </th>
              <th></th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ListEvent;
