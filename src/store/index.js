// store/index.js

import { createStore } from 'vuex';
import Cookies from 'js-cookie';
import AuthService from '../service/auth.service.js';
import { jwtDecode } from 'jwt-decode'; 

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
        isLoggedIn: user ? true : false,
        user: user,
        message: null,
        displayLoader: false,  // Added missing state
        loggedUser: null 
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setToken(state, token) {
            state.token = token;
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
        DISPLAY_LOADER(state, display) {
        state.displayLoader = display;
        },
        LOGIN_SUCCESS(state, user) {
            Cookies.set("user", JSON.stringify(user), { expires: 1 / 6 }); // 4 hours
            state.isLoggedIn = true;
            state.user = user;
        },
        LOGIN_FAIL(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
        LOGGED_USER(state, userData) { 
            const now = new Date().getTime();
            let expiryTime = now + (4 * 60 * 60 * 1000);  
            if (userData.accessToken) {
                try {
                    const decoded = jwtDecode(userData.accessToken);
                    expiryTime = decoded.exp * 1000; 
                } catch (error) {
                    console.warn('Failed to decode JWT for expiry:', error);
                }
            }
            const loggedUser = {
                ...userData.data,  // User info
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
                expiryDate: expiryTime
            };
            Cookies.set('loggedUser', JSON.stringify(loggedUser), { expires: 1 / 6 });
            state.loggedUser = loggedUser;  
        },
        LOGOUT(state) {
            Cookies.remove("user");
            state.isLoggedIn = false;
            state.user = null;
            state.loggedUser = null;
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
        updateAuthCode({ commit }, authCode) {
            commit('setAuthCode', authCode);  
        },
        // Auth actions
        register({ commit }, { name, email, password }) {  
            return AuthService.register(name, email, password).then(
                (responseData) => {  
                    commit('REGISTER_SUCCESS');
                    commit('SET_MESSAGE', responseData.message || 'Registration successful');  
                    return Promise.resolve();
                },
                (error) => {
                    const message =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                    commit('REGISTER_FAIL');
                    commit('SET_MESSAGE', message);
                    return Promise.reject(error);  
                }
            );
        },
    login({ commit }, { email, password }) {
            return AuthService.login(email, password).then(
                (userData) => { 
                    console.log('API User Data:', userData);  
                    
                    if (!userData || !userData.data) {  
                        throw new Error('Invalid user data received from API');
                    }
                    
                    const user = userData;  
                    const role = user.data.role; 
                    const userRole = typeof role === 'string' ? role : (Array.isArray(role) ? role[0] : null); 

                    if (userRole === "superadmin") {  
                        commit('LOGIN_SUCCESS', user.data); 
                        commit('setToken', user.accessToken); 
                        sessionStorage.setItem("user", JSON.stringify(user.data));  
                        const currentTime = new Date().getTime();
                        sessionStorage.setItem("loginTime", currentTime);
                        return Promise.resolve(user.data);
                    } else if (userRole === "user") {
                        commit('LOGIN_SUCCESS', user.data); 
                        commit('setToken', user.accessToken); 
                        sessionStorage.setItem("user", JSON.stringify(user.data));  
                        const currentTime = new Date().getTime();
                        sessionStorage.setItem("loginTime", currentTime);
                        return Promise.resolve(user.data);
                    } else {
                        commit('LOGIN_FAIL');
                        commit('SET_MESSAGE', 'Unknown or unsupported user role.');
                        return Promise.reject('Unknown user role.');
                    }
                },
            (error) => {
                const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                commit('LOGIN_FAIL');
                commit('SET_MESSAGE', message);
                console.error('Login error:', error);  // Existing logging
                return Promise.reject(error);
            }
        );
    },
        logout({ commit }) {
            AuthService.logout();
            commit('LOGOUT');
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("loginTime");
        }
    },
    getters: {
        getUserId: state => state.userId,
        getToken: state => state.token,
        getRestaurantInfo: state => state.restaurantInfo,
        getVehicleInfo: state => state.vehicleInfo,
        getAuthCode: state => state.authCode,
        isLoggedIn: state => state.isLoggedIn,
        currentUser: state => state.user,
        message: state => state.message
    }
});
