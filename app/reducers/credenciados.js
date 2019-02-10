import axios from "axios";
import update from "immutability-helper";

const INITIAL_STATE = {
  lista: [],
  page: 0,
  filter: "",
  isLoading: false,
  hasError: false
};

const CREDENCIADOS_REQUEST_START = "CREDENCIADOS_REQUEST_START";
const CREDENCIADOS_REQUEST_SUCCESS = "CREDENCIADOS_REQUEST_SUCCESS";
const CREDENCIADOS_REQUEST_FAIL = "CREDENCIADOS_REQUEST_FAIL";
const CREDENCIADO_UPDATE = "CREDENCIADO_UPDATE";
const CREDENCIADOS_FILTER_CHANGE = "CREDENCIADOS_FILTER_CHANGE";
const CREDENCIADOS_RESET = "CREDENCIADOS_RESET";

export const credenciadosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREDENCIADOS_RESET:
      return _credenciadosReset(state);
    case CREDENCIADOS_REQUEST_START:
      return _requestStart(state);
    case CREDENCIADOS_REQUEST_SUCCESS:
      return _requestSuccess(state, action);
    case CREDENCIADOS_REQUEST_FAIL:
      return _requestFail(state);
    case CREDENCIADOS_FILTER_CHANGE:
      return _filterChange(state, action);
    case CREDENCIADO_UPDATE:
      return _credenciadoUpdate(state, action);
    default:
      return state;
  }
};

// métodos a serem usados dentro do reducer

const _credenciadosReset = state => {
  return Object.assign({}, state, INITIAL_STATE);
};

const _requestStart = state => {
  return Object.assign({}, state, {
    page: state.page + 1,
    isLoading: true,
    hasError: false
  });
};





const _requestSuccess = (state, action) => {
  const { lista } = action;

  const listaToAppend = lista.filter(newItem => {
    return !state.lista.find(oldItem => oldItem.id === newItem.id);
  });

  const newLista = [...state.lista, ... listaToAppend];


  const _sortCredenciados = (a, b) => {
    const nomeA = a.nome.toLowerCase();
    const nomeB = b.nome.toLowerCase();
  
    let comparison = 0;
    if (nomeA > nomeB) comparison = 1;
    else if (nomeA < nomeB) comparison = -1;
    
    return comparison;
  };

  // newLista.sort(_sortCredenciados);

  return Object.assign({}, state, {
    lista: newLista,
    isLoading: false,
    hasError: false
  });
};

const _requestFail = state => {
  return Object.assign({}, state, {
    isLoading: false,
    hasError: true
  });
};

const _filterChange = (state, action) => {
  const { filter } = action;
  return Object.assign({}, state, {
    filter
  });
};

const _credenciadoUpdate = (state, action) => {
  const { credenciado } = action;

  const index = state.lista.findIndex(item => item.id === credenciado.id);
  const newLista = update(state.lista, {
    [index]: {
      presente: { $set: credenciado.presente }
    }
  });

  return Object.assign({}, state, {
    lista: newLista
  });
};

// métodos para disparar actions

const _requestLista = () => {
  return {
    type: CREDENCIADOS_REQUEST_START
  };
};

const _storeLista = data => {
  if (Array.isArray(data)) {

    const lista = data.map(item => {
      const {
        name,
        email,
        picture,
        login: { uuid }
      } = item;

      const rand = Math.random();

      return {
        id: uuid,
        nome: `${name.first} ${name.last}`,
        email: email,
        necessidadesEspeciais: rand >= 0.9,
        avatar: {
          large: picture.large,
          medium: picture.medium,
          thumbnail: picture.thumbnail
        },
        presente: rand >= 0.5
      };
    });

    return {
      type: CREDENCIADOS_REQUEST_SUCCESS,
      lista
    };
  }
};

const _resetlista = () => ({
  type: CREDENCIADOS_RESET
});

const _handleError = error => {
  return {
    type: CREDENCIADOS_REQUEST_FAIL,
    error
  };
};

const _setFilter = filter => ({
  type: CREDENCIADOS_FILTER_CHANGE,
  filter
});

// métodos expostos

const fetchListaFromStart = () => {
  return function(dispatch) {
    dispatch(_resetlista());
    dispatch(fetchLista());
  };
};

const fetchLista = () => {
  return function(dispatch, getState) {
    const isLoading = getState().credenciados.isLoading;


    if (!isLoading) {
      // setando isLoading = true
      dispatch(_requestLista());

      const perPage = 10;
      const page = getState().credenciados.page;
      const fetchUrl = `https://randomuser.me/api/?seed=2&page=${page}&results=${perPage}`;

      axios
        .get(fetchUrl)
        .then(response => dispatch(_storeLista(response.data.results)))
        .catch(error => dispatch(_handleError(error)));
    }
  };
};

const filterLista = filter => {
  return function(dispatch, getState) {
    dispatch(_setFilter(filter));
    // dispatch(fetchLista());
    dispatch(fetchListaFromStart());
  };
};

const updateCredenciado = credenciado => {
  return {
    type: CREDENCIADO_UPDATE,
    credenciado
  };
};

export const credenciadosActions = {
  fetchLista,
  fetchListaFromStart,
  filterLista,
  updateCredenciado
};
