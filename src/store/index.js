import { createStore } from "vuex";
import {
  auth, db, doc, getDoc, setDoc, provider, signInWithPopup, updateProfile,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "../includes/firebase";

export default createStore({
  state: {
    accountType: null
  },
  mutations: {
    setAccountType(state, accountType) {
      state.accountType = accountType
    }
  },
  actions: {
    async login({ }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
    },

    async googleLogin() {
      await signInWithPopup(auth, provider);
    },

    async register({ }, payload) {
      await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    },

    async addUserBuyer({ commit }) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        email: auth.currentUser.email,
        accountType: "Buyer"
      })
      commit('setAccountType', "Buyer");
    },

    async addRestaurant({ commit }, payload) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        username: payload.info.restaurantName,
        email: auth.currentUser.email,
        accountType: "Restaurant"
      })
      commit('setAccountType', "Restaurant");
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
