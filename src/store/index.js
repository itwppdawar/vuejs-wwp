// store/index.js

import { createStore } from 'vuex';
import Cookies from 'js-cookie';
import AuthService from '../service/auth.service.js';

// Get user from cookies
const userCookie = Cookies.get("user");
let user = null;
if (userCookie) {
    try {
        user = JSON.parse(userCookie);
    } catch (error) {
        console.warn("Invalid user cookie, clearing it");
        Cookies.remove("user");
        user = null;
    }
}

export default createStore({
    state: {
        userId: null,
        token: null,
        authCode: null,
        restaurantInfo: null,
        vehicleInfo: null,
        // Auth state
        isLoggedIn: user ? true : false,
        user: user,
        message: null
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setToken(state, token) {
            state.token = token;
        },
        setRestaurantInfo(state, restaurantInfo) {
            state.restaurantInfo = restaurantInfo;
        },
        setVehicleInfo(state, vehicleInfo) {
            state.vehicleInfo = vehicleInfo;
        },
        setAuthCode(state, authCode) {
            state.authCode = authCode;
        },
        // Auth mutations
        REGISTER_SUCCESS(state) {
            state.isLoggedIn = false;
        },
        REGISTER_FAIL(state) {
            state.isLoggedIn = false;
        },
        LOGIN_SUCCESS(state, payload) {
            Cookies.set("user", JSON.stringify(payload.user), { expires: 1 / 6 });
            state.isLoggedIn = true;
            state.user = payload.user;
            state.data = payload.data;
        },
        LOGIN_FAIL(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
        SET_MESSAGE(state, message) {
            state.message = message;
        },
        CLEAR_MESSAGE(state) {
            state.message = null;
        }
    },
    actions: {
        updateUserId({ commit }, userId) {
            commit('setUserId', userId);
        },
        updateToken({ commit }, token) {
            commit('setToken', token);
        },
        updateRestaurantInfo({ commit }, restaurantInfo) {
            commit('setRestaurantInfo', restaurantInfo);
        },
        updateVehicleInfo({ commit }, vehicleInfo) {
            commit('setVehicleInfo', vehicleInfo);
        },
        updateAuthCode({ commit }, restaurantInfo) {
            commit('setAuthCode', restaurantInfo);
        },
        // Auth actions
        register({ commit }, { email, password }) {
            return AuthService.register(email, password).then(
                (response) => {
                    commit('REGISTER_SUCCESS');
                    commit('SET_MESSAGE', response.data.message);
                    return Promise.resolve();
                },
                (error) => {
                    const message =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                    
                    commit('REGISTER_FAIL');
                    commit('SET_MESSAGE', message);
                    return Promise.reject();
                }
            );
        },
        login({ commit }, { email, password }) {
            return AuthService.login(email, password).then(
                (data) => {
                    const userRole = data.data.role[0];
                    
                    if (userRole === "admin") {
                        commit('LOGIN_FAIL');
                        return Promise.reject();
                    } else if (userRole === "user") {
                        commit('LOGIN_SUCCESS', { user: "user", data: data });
                    }
                    
                    sessionStorage.setItem("user", JSON.stringify(data));
                    Cookies.set("user", JSON.stringify(data));
                    const currentTime = new Date().getTime();
                    sessionStorage.setItem("loginTime", currentTime);
                    return Promise.resolve();
                },
                (error) => {
                    commit('LOGIN_FAIL');
                    return Promise.reject();
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('LOGOUT');
        }
    },
    getters: {
        getUserId: state => state.userId,
        getToken: state => state.token,
        getRestaurantInfo: state => state.restaurantInfo,
        getVehicleInfo: state => state.vehicleInfo,
        getAuthCode: state => state.authCode,
        // Auth getters
        isLoggedIn: state => state.isLoggedIn,
        currentUser: state => state.user,
        message: state => state.message
    }
});