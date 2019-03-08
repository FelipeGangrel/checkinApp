import axios from "axios";
import update from "immutability-helper";
import API_URL from "./api-paths";

const INITIAL_STATE = {
  lista: [],
  page: 0,
  next: true,
  prev: false,
  totalPages: 0,
  filter: "",
  isLoading: false,
  hasError: false,
  credenciadosTotal: 0,
  credenciadosPresentes: 0,
};

const CREDENCIADOS_REQUEST_START = "CREDENCIADOS_REQUEST_START";
const CREDENCIADOS_REQUEST_SUCCESS = "CREDENCIADOS_REQUEST_SUCCESS";
const CREDENCIADOS_REQUEST_FAIL = "CREDENCIADOS_REQUEST_FAIL";
const CREDENCIADO_UPDATE = "CREDENCIADO_UPDATE";
const CREDENCIADOS_FILTER_CHANGE = "CREDENCIADOS_FILTER_CHANGE";
const CREDENCIADOS_LISTA_RESET = "CREDENCIADOS_LISTA_RESET";
const CREDENCIADOS_UPDATE_PAGINATOR = "CREDENCIADOS_UPDATE_PAGINATOR";
const CREDENCIADOS_UPDATE_RESUMO_TOTAIS = "CREDENCIADOS_UPDATE_RESUMO_TOTAIS";
const CREDENCIADOS_RESET = "CREDENCIADOS_RESET";


export const credenciadosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREDENCIADOS_REQUEST_START:
      return _actionRequestStart(state);
    case CREDENCIADOS_REQUEST_SUCCESS:
      return _actionRequestSuccess(state, action);
    case CREDENCIADOS_REQUEST_FAIL:
      return _actionRequestFail(state);
    case CREDENCIADOS_FILTER_CHANGE:
      return _actionFilterChange(state, action);
    case CREDENCIADO_UPDATE:
      return _actionUpdateCredenciado(state, action);
    case CREDENCIADOS_UPDATE_PAGINATOR:
      return _actionUpdatePaginator(state, action);
    case CREDENCIADOS_UPDATE_RESUMO_TOTAIS:
      return _actionUpdateResumoTotais(state, action);
    case CREDENCIADOS_LISTA_RESET:
      return _actionCredenciadosListaReset(state);
    case CREDENCIADOS_RESET:
      return Object.assign({}, state, INITIAL_STATE);
    default:
      return state;
  }
};

// métodos a serem usados dentro do reducer
const _actionRequestStart = state => {
  return Object.assign({}, state, {
    page: state.page + 1,
    isLoading: true,
    hasError: false
  });
};

const _actionRequestSuccess = (state, action) => {
  const { lista } = action;

  const listaToAppend = lista.filter(newItem => {
    return !state.lista.find(oldItem => oldItem.id === newItem.id);
  });

  const newLista = [...state.lista, ... listaToAppend];

  return Object.assign({}, state, {
    lista: newLista,
    isLoading: false,
    hasError: false
  });
};

const _actionRequestFail = state => {
  return Object.assign({}, state, {
    isLoading: false,
    hasError: true
  });
};

const _actionFilterChange = (state, action) => {
  const { filter } = action;
  return Object.assign({}, state, {
    filter
  });
};

const _actionUpdateCredenciado = (state, action) => {
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

const _actionUpdatePaginator = (state, action) => {
  const { prev, next, totalPages, credenciadosTotal, credenciadosPresentes } = action.paginator;
  return Object.assign({}, state, {
    prev,
    next,
    totalPages,
    credenciadosTotal,
    credenciadosPresentes,
  });
};

const _actionUpdateResumoTotais = (state, action) => {
  const { credenciadosTotal, credenciadosPresentes } = action.resumo;
  return Object.assign({}, state, {
    credenciadosTotal,
    credenciadosPresentes,
  });
};

const _actionCredenciadosListaReset = state => {
  return Object.assign({}, state,  {
    lista: [],
    page: 0,
    prev: false,
    next: true,
    hasError: false,
    totalPages: 0,
    credenciadosTotal: 0,
    credenciadosPresentes: 0,
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

      return {
        id: item.id,
        nome: item.nome,
        email: item.email,
        sexo: item.sexo,
        empresa: item.empresa,
        ingresso: item.ingresso,
        necessidadesEspeciais: item.necessidades_especiais,
        presente: item.presente,
        eticket: item.eticket,
        avatar: {
          thumbnail: item.thumbnail
        },
      };
    });

    return {
      type: CREDENCIADOS_REQUEST_SUCCESS,
      lista
    };
  }
};

const _resetlista = () => ({
  type: CREDENCIADOS_LISTA_RESET
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

const _updatePaginator = paginator => ({
  type: CREDENCIADOS_UPDATE_PAGINATOR,
  paginator,
});

const _updateResumoTotais = resumo => ({
  type: CREDENCIADOS_UPDATE_RESUMO_TOTAIS,
  resumo,
});

const _updateCredenciado = credenciado =>({
  type: CREDENCIADO_UPDATE,
  credenciado,
});

// métodos expostos

const fetchListaFromStart = () => {
  return function(dispatch) {
    dispatch(_resetlista());
    dispatch(fetchLista());
  };
};

const updateResumoTotais = resumo => {
  const { credenciadosTotal,  credenciadosPresentes} = resumo;
  return function (dispatch) {
    dispatch(_updateResumoTotais({ credenciadosTotal, credenciadosPresentes }));
  }
};

const fetchLista = () => {
  return function(dispatch, getState) {
    const isLoading = getState().credenciados.isLoading;
    if (!isLoading) {
      // setando isLoading = true
      dispatch(_requestLista());

      const filter = getState().credenciados.filter;
      const page = getState().credenciados.page;
      const evento = getState().eventos.activeEvent.id;
      const ambiente = getState().eventos.activeAmbiente != null 
        ? getState().eventos.activeAmbiente.id
        : null;

      // const fetchUrl = `https://randomuser.me/api/?seed=2&page=${page}&results=${perPage}`;

      let fetchUrl = `${API_URL}Api/Controller/APIExterna/AppCheckin/Credenciados.php?functionPage=Listar&page=${page}&evento=${evento}`;
      if (ambiente) fetchUrl += `&ambiente=${ambiente}`;
      if (filter != "") fetchUrl += `&search=${filter}`;

      axios
        .get(fetchUrl)
        .then(response => {
          if (response.data.success) {
            const { prev, next, totalPages, credenciadosTotal, credenciadosPresentes  } = response.data; 
            dispatch(_updatePaginator({ prev, next, totalPages }));
            dispatch(_updateResumoTotais({ credenciadosTotal, credenciadosPresentes }));
            dispatch(_storeLista(response.data.data))
          }
        })
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

  return function (dispatch, getState) {

    const activeAmbiente = getState().eventos.activeAmbiente;
    
    const usuarioId = getState().auth.user.id;
    const eventoId = getState().eventos.activeEvent.id;
    const ambienteId = activeAmbiente != null ? activeAmbiente.id : null;

    const postUrl = `${API_URL}Api/Controller/APIExterna/AppCheckin/Credenciados.php?functionPage=Presenca`;
    const formData = new FormData();
    formData.append('usuario', usuarioId);
    formData.append('evento', eventoId);
    formData.append('eticket', credenciado.eticket);
    formData.append('presente', credenciado.presente ? 1 : 0);
    if (ambienteId != null) formData.append('ambiente', ambienteId);

    axios
      .post(postUrl, formData)
      .then(response => {
        if (response.data.success) {
          const { credenciadosTotal, credenciadosPresentes } = response.data;
          const c = response.data.data[0];
          // só atualizar lista caso o dado retornado seja realmente de um credendiaco
          if (c != undefined) {
            const credenciado = {
              id: c.id,
              nome: c.nome,
              email: c.email,
              sexo: c.sexo,
              empresa: c.empresa,
              ingresso: c.ingresso,
              necessidadesEspeciais: c.necessidades_especiais,
              presente: c.presente,
              eticket: c.eticket,
              isCredenciado: c.isCredenciado,
              avatar: {
                thumbnail: c.thumbnail
              },
            };
            dispatch(_updateCredenciado(credenciado));
          }
          dispatch(_updateResumoTotais({ credenciadosTotal, credenciadosPresentes }));
        }

        if (response.data.error != null) {
          alert(response.data.error);
        }
      })
      .catch(error => dispatch(_handleError(error)));

  }


};

const reset = () => ({
  type: CREDENCIADOS_RESET,
});

export const credenciadosActions = {
  fetchLista,
  fetchListaFromStart,
  filterLista,
  updateCredenciado,
  updateResumoTotais,
  reset,
};
