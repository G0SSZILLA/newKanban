import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost") ?
    "//localhost:3000/" :
    "/";

let api = Axios.create({
    baseURL: base + "api/",
    timeout: 15000,
    withCredentials: true,
});

export default new Vuex.Store({
    state: {
        user: {},
        boards: [],
        activeBoard: {},
        activeList: {},
        board: {},
        lists: [],
        tasks: {},
        comments: {}
        //this is a list id
        // "5ea09da546fb313afc19370d": [{ title: "task One" }]
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setBoards(state, boards) {
            state.boards = boards;
        },
        setActiveBoard(state, board) {
            state.activeBoard = board;
        },
        setActiveList(state, list) {
            state.activeList = list
        },
        setLists(state, lists) {
            state.lists = lists;
        },
        setTasks(state, payload) {
            Vue.set(state.tasks, payload.listId, payload.tasks);
        },
        setComments(state, payload) {
            Vue.set(state.comments, payload.taskId, payload.comments);
        }
    },
    actions: {
        //#region -- AUTH STUFF --
        setBearer({}, bearer) {
            api.defaults.headers.authorization = bearer;
        },
        resetBearer() {
            api.defaults.headers.authorization = "";
        },
        async getProfile({ commit }) {
            try {
                let res = await api.get("/profile");
                commit("setUser", res.data);
            } catch (err) {
                console.error(err);
            }
        },
        //#endregion

        //#region -- BOARDS --
        async getBoards({ commit, dispatch }) {
            try {
                let res = await api.get("boards");
                commit("setBoards", res.data);
            } catch (error) {
                console.error(error, "getBoards Failing");
            }
        },
        async getBoard({ commit, dispatch }, boardId) {
            try {
                let res = await api.get(`boards/${boardId}`);
                console.log("activeBoard", res.data);
                commit("setActiveBoard", res.data);
            } catch (error) {
                console.error(error);
            }
        },

        async addBoard({ commit, dispatch }, boardData) {
            try {
                let res = await api.post("boards", boardData);
                dispatch("getBoards");
            } catch (error) {
                console.error(error, "addBoard Failing");
            }
            // api.post('boards', boardData)
            //     .then(serverBoard => {
            //         dispatch('getBoards')
            //     })
        },

        async deleteBoard({ dispatch }, boardId) {
            try {
                console.log("boardId from delete board", boardId);

                await api.delete("boards/" + boardId);
                dispatch("getboards");
            } catch (error) {
                console.error(error, 'deleteBoard Failing');
            }
        },
        async editBoard({ dispatch }, board) {
            try {
                await api.put('boards/' + board._id, board)
                dispatch('getBoard', board._id)
            } catch (error) {
                console.error(error, 'editBoard is Failing');
            }
        },
        //#endregion

        //#region -- LISTS --
        async getList({ commit, dispatch }, boardId) {
            try {
                let res = await api.get('boards/' + boardId + '/lists')
                console.log('from get list', res);
                commit('setLists', res.data)
            } catch (error) {
                console.error(error, "getList Failed");

            }
        },
        async deleteList({ commit, dispatch }, list) {
            try {
                console.log("deleteList log", list);
                await api.delete('lists/' + list.id)
                dispatch('getList', list.boardId)
            } catch (error) {
                console.error(error, "deleteList failed");
            }
        },

        async editList({ dispatch }, list) {
            try {
                console.log('edit list in store', list);
                // TODO getting 404 on submit edit(BUT WORKS)
                await api.put('lists/' + list.id, list)
                dispatch('getBoard', list)
            } catch (error) {
                console.error(error, 'editBoard is Failing');
            }
        },

        async addList({ commit, dispatch }, listId) {
            console.log("new list", listId);

            try {
                let res = await api.post('lists/', listId)
                console.log("list data from addList", res);
                // NOTE need to fix dispatch for this function!
                dispatch("getList", listId.boardId)
            } catch (error) {
                console.error(error, "addList Failing");
            }

        },
        //#endregion

        // #region --TASKS--

        async getTasks({ commit, dispatch }, listId) {
            try {
                let res = await api.get('lists/' + listId + '/tasks')
                console.log('from get tasks', res);
                commit('setTasks', { listId, tasks: res.data })
            } catch (error) {
                console.error(error, "getTasks Failed");

            }
        },
        async addTask({ commit, dispatch }, listId) {
            console.log("new task", listId);
            try {
                let res = await api.post('tasks/', listId)
                console.log("list data from addTask", res);
                // NOTE need to fix dispatch for this function!
                dispatch("getTasks", listId.listId)
            } catch (error) {
                console.error(error, "addTask Failing");
            }
        },
        async deleteTask({ commit, dispatch }, taskId) {
            try {
                console.log("deleteTask log", taskId);
                await api.delete('tasks/' + taskId.id)
                dispatch('getTasks', taskId.listId)
            } catch (error) {
                console.error(error, "deleteTask failed");
            }
        },
        // //#endregion

        // #region --COMMENTS--
        async getComments({ commit, dispatch }, taskId) {
            try {
                let res = await api.get('tasks/' + taskId + '/comments')
                console.log('from get comments', res);
                commit('setComments', { taskId, comments: res.data })
            } catch (error) {
                console.error(error, "getComments Failed");

            }
        },

        // //#endregion
    },
});