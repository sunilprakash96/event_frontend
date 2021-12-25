const EVENT_LIST = "EVENT_LIST";
const GET_SINGLE_EVENT = "GET_SINGLE_EVENT";

const initialState = {
  eventList: [],
  event: {},
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_LIST:
      return { ...state, eventList: action.payload };

    case GET_SINGLE_EVENT:
      return { ...state, event: action.payload };

    default:
      return state;
  }
};

export default EventReducer;
