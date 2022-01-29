import { createStore } from "vuex";
import {
  auth, db, doc, setDoc, provider, signInWithPopup, updateProfile,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "@/services/firebase";

export default createStore({
  state: {
    hasOrders: false,
    user: null,
  },
  mutations: {
    SET_ORDERS(state, payload) {
      state.hasOrders = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    setHasOrders({ commit }, payload) {
      commit('SET_ORDERS', payload)
    },

    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    
    async login({ }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
    },

    async googleLogin() {
      await signInWithPopup(auth, provider);
    },

    async register({ }, payload) {
      await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    },

    async addRestaurant({ }, payload) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        username: payload.info.restaurantName,
        email: auth.currentUser.email,
        accountType: "Restaurant"
      })
      await setDoc(doc(db, 'restaurants', auth.currentUser.uid), {
        info: payload.info,
        payment: payload.payment
      })
      await updateProfile(auth.currentUser, { displayName: payload.info.restaurantName })
    },

    async signOut() {
      await signOut(auth);
    },
  },
});
