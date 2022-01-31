import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
	auth,
	db,
	doc,
	setDoc,
	provider,
	signInWithPopup,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "@/services/firebase";

export default createStore({
	state: {
		orders: [],
		cart: [],
		menu: [],
		restaurants: [],
	},
	plugins: [createPersistedState()],
	mutations: {
		SET_ORDERS(state, payload) {
			state.orders = payload;
		},
		ADD_TO_CART(state, payload) {
			if (!state.cart.some((item) => item.id === payload.id))
				state.cart = [...state.cart, payload];
		},
		ADD_QUANTITY(state, payload) {
			state.cart = state.cart.map((item) => {
				if (item.id === payload) item.quantity++;
				return item;
			});
		},
		MINUS_QUANTITY(state, payload) {
			let newCart = [];
			state.cart.forEach((item) => {
				if (item.id === payload) item.quantity--;
				if (item.quantity > 0) newCart.push(item);
			});
			state.cart = newCart;
		},
		DEL_FROM_CART(state, payload) {
			state.cart = state.cart.filter((item) => item.id !== payload);
		},
		UPDATE_MENU(state, payload) {
			state.menu = payload;
		},
		UPDATE_RESTAURANTS(state, payload) {
			state.restaurants = payload;
		},
	},
	actions: {
		setOrders({ commit }, payload) {
			commit("SET_ORDERS", payload);
		},

		addToCart({ commit }, payload) {
			commit("ADD_TO_CART", payload);
		},
		addQuantity({ commit }, payload) {
			commit("ADD_QUANTITY", payload);
		},
		minusQuantity({ commit }, payload) {
			commit("MINUS_QUANTITY", payload);
		},
		deleteFromCart({ commit }, payload) {
			commit("DEL_FROM_CART", payload);
		},

		updateMenu({ commit }, payload) {
			commit("UPDATE_MENU", payload);
		},

		updateRestaurants({ commit }, payload) {
			commit("UPDATE_RESTAURANTS", payload);
		},

		async login({}, payload) {
			await signInWithEmailAndPassword(auth, payload.email, payload.password);
		},

		async googleLogin() {
			await signInWithPopup(auth, provider);
		},

		async register({}, payload) {
			await createUserWithEmailAndPassword(
				auth,
				payload.email,
				payload.password
			);
		},

		async addRestaurant({}, payload) {
			await setDoc(doc(db, "users", auth.currentUser.uid), {
				username: payload.info.restaurantName,
				email: auth.currentUser.email,
				accountType: "Restaurant",
			});
			await setDoc(doc(db, "restaurants", auth.currentUser.uid), {
				info: payload.info,
				payment: payload.payment,
			});
			await updateProfile(auth.currentUser, {
				displayName: payload.info.restaurantName,
			});
		},

		async signOut() {
			await signOut(auth);
		},
	},
});
