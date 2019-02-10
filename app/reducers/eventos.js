const INITIAL_STATE = {
  events: [],
  activeEvent: null
};

const EVENTS_SWITCH_ACTIVE_EVENT = "EVENTS_SWITCH_ACTIVE_EVENT";
const EVENTS_UPDATE_LIST = "EVENTS_UPDATE_LIST";

export const eventosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTS_SWITCH_ACTIVE_EVENT:
      return _actionEventsSwitchActiveEvent(state, action);
    case EVENTS_UPDATE_LIST:
      return _actionEventsUpdateList(state, action);
    default:
      return state;
  }
};

// métodos auxiliares para o reduer

const _actionEventsSwitchActiveEvent = (state, action) => {
  const { activeEvent } = action;
  return Object.assign({}, state, {
    activeEvent
  });
};

const _actionEventsUpdateList = (state, action) => {
  const { events } = action;
  return Object.assign({}, state, {
    events
  });
};

// auth

const _userHasActiveEvent = hasActiveEvent => ({
  type: "USER_HAS_ACTIVE_EVENT",
  hasActiveEvent,
});

// métodos auxiliares

const _switchActiveEvent = activeEvent => ({
  type: EVENTS_SWITCH_ACTIVE_EVENT,
  activeEvent
});

// métodos expostos

const switchActiveEvent = activeEvent => {
  return function (dispatch) {
    dispatch(_userHasActiveEvent(true));
    dispatch(_switchActiveEvent(activeEvent));
  }
};

const updateList = events => ({
  type: EVENTS_UPDATE_LIST,
  events
});

export const eventosActions = {
  switchActiveEvent,
  updateList
};
