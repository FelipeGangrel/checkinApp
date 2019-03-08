import { credenciadosActions } from "./credenciados";

const INITIAL_STATE = {
  events: [],
  activeEvent: null,
  activeAmbiente: null,
};

const EVENTS_SWITCH_ACTIVE_EVENT = "EVENTS_SWITCH_ACTIVE_EVENT";
const EVENTS_SWITCH_ACTIVE_AMBIENTE = "EVENTS_SWITCH_ACTIVE_AMBIENTE";
const EVENTS_UPDATE_LIST = "EVENTS_UPDATE_LIST";
const EVENTS_RESET = "EVENTS_RESET";

export const eventosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTS_SWITCH_ACTIVE_EVENT:
      return _actionEventsSwitchActiveEvent(state, action);
    case EVENTS_SWITCH_ACTIVE_AMBIENTE:
      return _actionEventsSwitchActiveAmbiente(state, action);
    case EVENTS_UPDATE_LIST:
      return _actionEventsUpdateList(state, action);
    case EVENTS_RESET:
      return Object.assign({}, state, INITIAL_STATE);
    default:
      return state;
  }
};

// métodos auxiliares para o reduer

const _actionEventsSwitchActiveEvent = (state, action) => {
  const { activeEvent } = action;
  return Object.assign({}, state, {
    activeEvent,
    activeAmbiente: null,
  });
};

const _actionEventsSwitchActiveAmbiente = (state, action) => {
  const { activeAmbiente } = action;
  return Object.assign({}, state, {
    activeAmbiente,
  });
}

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

// credenciados
const _credenciadosFetchListaFromStart = () => {
  return function (dispatch) {
    dispatch(credenciadosActions.fetchListaFromStart());
  }
};

const _credenciadosUpdateResumoTotais = () => {
  return function (dispatch) {
    dispatch(credenciadosActions.updateResumoTotais({ 
      credenciadosTotal: 0,
      credenciadosPresentes: 0,
    }));
  }
}

// métodos auxiliares

const _switchActiveEvent = activeEvent => ({
  type: EVENTS_SWITCH_ACTIVE_EVENT,
  activeEvent
});

const _switchActiveAmbiente = activeAmbiente => ({
  type: EVENTS_SWITCH_ACTIVE_AMBIENTE,
  activeAmbiente,
});

// métodos expostos

const switchActiveEvent = activeEvent => {
  return function (dispatch) {
    // dispatch(_credenciadosUpdateResumoTotais()); 
    dispatch(_userHasActiveEvent(true));
    dispatch(_switchActiveEvent(activeEvent));
    dispatch(_credenciadosFetchListaFromStart());
  }
};

const updateList = events => ({
  type: EVENTS_UPDATE_LIST,
  events
});

const switchActiveAmbiente = activeAmbiente => {
  return function (dispatch) {
    // dispatch(_credenciadosUpdateResumoTotais());
    dispatch(_switchActiveAmbiente(activeAmbiente));
    dispatch(_credenciadosFetchListaFromStart());
  }
};

const reset = () => ({
  type: EVENTS_RESET,
});

export const eventosActions = {
  switchActiveEvent,
  switchActiveAmbiente,
  updateList,
  reset,
};
