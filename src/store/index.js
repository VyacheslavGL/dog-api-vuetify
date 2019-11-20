import Vue from 'vue'
import Vuex from 'vuex'
import Dogs from '../services/Dogs'
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_BREEDS,
  SET_FAVORITES,
  SET_PHOTO,
  SET_USER
} from "./mutation.types";
import {
  LOAD_BREEDS,
  LOAD_FAVORITES,
  LOAD_RANDOM_BREEDS_PHOTOS,
  SIGNIN, SIGNOUT,
  SIGNUP,
  TOGGLE_FAVORITE_IMAGE
} from "./action.types";
import Users from "../services/Users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breeds: [],
    photos: [],
    favorites: [],
    user:{
      uid: null,
      email: '',
    },
  },
  mutations: {
    //для изменения breeds
    [SET_BREEDS](state, breeds){
      state.breeds = breeds;
    },
    [SET_PHOTO](state, photos){
      state.photos = photos;
    },
    [SET_FAVORITES](state, favorites){
      state.favorites = favorites;
    },
    //добавляем картинку
    [ADD_TO_FAVORITES](state, images){
      state.favorites.unshift(images);
    },
    //удаляем картинку
    [REMOVE_FROM_FAVORITES](state, images){
      const index = state.favorites.indexOf(images);
      if(index > -1){
        state.favorites.splice(index, 1);
      }
    },
    [SET_USER](state, user){
      state.user = user;
    }
  },
  actions: {
    //вызывает мутацию
    async [LOAD_BREEDS]({commit}){
      commit(SET_BREEDS, await Dogs.getAllBreeds());
    },
    async [LOAD_RANDOM_BREEDS_PHOTOS]({commit}, options){
      commit(SET_PHOTO, await Dogs.getDogsByBreed(options));
    },
    async [TOGGLE_FAVORITE_IMAGE]({ commit, state }, image){
      if(state.favorites.includes(image)){
        commit(REMOVE_FROM_FAVORITES, image);
      }else{
        commit(ADD_TO_FAVORITES, image);
      }
      await Dogs.saveDogsToStorage(state.favorites)
    },
    async [LOAD_FAVORITES]({commit}){
      commit(SET_FAVORITES, await Dogs.getDogsFromStorage())
    },
    async [SIGNIN]({commit}, {email, password}){
      const user = await Users.getUserByCredentials(email, password);
      commit(SET_USER, user);
    },
    async [SIGNUP]({commit}, {email, password}){
      const user = await Users.createUser(email, password);
      commit(SET_USER, user);
    },
    async [SIGNOUT]({commit}){
      await Users.logout();
      commit(SET_USER, {
        uid: null,
        email: '',
      });
    },
  },
  modules: {
  }
})
