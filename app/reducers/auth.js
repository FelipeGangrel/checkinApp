import axios from "axios";
import API_URL from "./api-paths";

const INITIAL_STATE = {
  user: {},
  formUser: {
    email: "vitor@sivis.com.br",
    senha: "rljr2010",
  },
  isSignedIn: false,
  isLoading: false,
  hasError: false,
  hasActiveEvent: false,
  teste: "teste",
};

const LOGIN_REQUEST_START = "LOGIN_REQUEST_START";
const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
const LOGIN_REQUEST_FAIL = "LOGIN_REQUEST_FAIL";
const USER_HAS_ACTIVE_EVENT = "USER_HAS_ACTIVE_EVENT";
const LOGIN_CLEAR_ERROR = "LOGIN_CLEAR_ERROR";
const USER_UPDATE_FORMUSER = "USER_UPDATE_FORMUSER";
const USER_LOGOUT = "USER_LOGOUT";
const AUTH_RESET = "AUTH_RESET";

// reducer
export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_START:
      return _loginRequestStart(state);
    case LOGIN_REQUEST_SUCCESS:
      return _loginRequestSuccess(state, action);
    case LOGIN_REQUEST_FAIL:
      return _loginRequestFail(state);
    case USER_HAS_ACTIVE_EVENT:
      return _userHasActiveEvent(state, action);
    case LOGIN_CLEAR_ERROR:
      return _loginClearError(state);
    case USER_UPDATE_FORMUSER:
      return _userUpdateFormUser(state, action);
    case AUTH_RESET:
      return Object.assign({}, state, INITIAL_STATE);
    default:
      return state;
  }
};

// métodos auxiliares para o reducer

const _loginRequestStart = state => {
  return Object.assign({}, state, {
    isLoading: true,
    hasError: false
  });
};

const _loginRequestSuccess = (state, action) => {
  const { user } = action;
  return Object.assign({}, state, {
    user,
    isSignedIn: true,
    isLoading: false,
    hasError: false
  });
};

const _loginRequestFail = state => {
  return Object.assign({}, state, {
    isLoading: false,
    hasError: true
  });
};

const _userHasActiveEvent = (state, action) => {
  const { hasActiveEvent } = action;
  return Object.assign({}, state, {
    hasActiveEvent
  });
};

const _loginClearError = state => {
  return Object.assign({}, state, {
    hasError: false
  });
};

const _userUpdateFormUser = (state, action) => {
  const { formUser } = action;
  return Object.assign({}, state, {
    formUser,
  });
};

// métodos para invocar actions

const _requestLogin = () => ({
  type: LOGIN_REQUEST_START
});

const _storeUser = user => ({
  type: LOGIN_REQUEST_SUCCESS,
  user
});

const _handleError = error => ({
  type: LOGIN_REQUEST_FAIL,
  error
});

// eventos reducer
const _dispatchEventosUpdateList = events => ({
  type: "EVENTS_UPDATE_LIST",
  events
});

const _dispatchEventosSwitchActiveEvent = activeEvent => ({
  type: "EVENTS_SWITCH_ACTIVE_EVENT",
  activeEvent
});

const _updateFormUser = formUser => ({
  type: USER_UPDATE_FORMUSER,
  formUser,
});

// métodos expostos
const signInUser = user => {
  return function(dispatch) {
    // setando isLoading = true
    dispatch(_requestLogin());
    dispatch(_updateFormUser({
      email: user.email, 
      senha: user.senha}));

    const postUrl = `${API_URL}Api/Controller/Comprador/login.php`;

    console.log(postUrl);

    let formData = new FormData();

    formData.append("functionPage", "LoginPage");
    formData.append("email", user.email);
    formData.append("senha", user.senha);

    axios
      .post(postUrl, formData)
      .then(response => {
        const {
          id,
          email,
          nome_pessoa,
          list_sf_pessoa_eventos
        } = response.data;

        const user = {
          id: id,
          email: email,
          nome: nome_pessoa
        };

        const events = list_sf_pessoa_eventos.map(event => ({
          id: event.id_evento.id,
          nome: event.id_evento.nome_evento
        }));

        // se o usuário puder gerenciar apenas um evento, defini-lo de uma vez como ativo
        const activeEvent = events.length === 1 ? events[0] : null;

        dispatch(_storeUser(user));
        dispatch(_dispatchEventosUpdateList(events));
        if (activeEvent !== null) {
          dispatch(_dispatchEventosSwitchActiveEvent(activeEvent));
        }
      })
      .catch(error => dispatch(_handleError(error)));
  };
};

// esta action não será tratada dentro deste reducer
// pois a estamos capturando em nosso rootReducer e
// limpando o state geral da aplicação ao fazê-lo
const signOutUser = () => ({
  type: USER_LOGOUT
});

const switchActiveEvent = activeEvent => ({
  type: SWITCH_ACTIVE_EVENT,
  activeEvent
});

const clearError = () => ({
  type: LOGIN_CLEAR_ERROR
});

const reset = () => ({
  type: AUTH_RESET,
});

export const authActions = {
  signInUser,
  signOutUser,
  switchActiveEvent,
  clearError,
  reset,
};
