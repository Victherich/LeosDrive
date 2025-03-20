
// // import { createSlice } from "@reduxjs/toolkit";

// // const MySlice = createSlice({
// //   name: "user",
// //   initialState: {
// //     adminInfo: null,
// //     adminToken: null,
// //     userInfo: null,
// //     userToken: null,

// //     cartItems: [], // Array of cart items
// //     totalQuantity: 0, // Total number of items in the cart
// //     totalAmount: 0, // Total price of items in the cart

// //     DeliveryDetail:{
// //       firstName: '',
// //       lastName:'',
// //       phone: '',
// //       confirmPhone: '',
// //       email: '',
// //       address: '',
// //       state: '',
// //       city: '',
// //     },

// //   },
// //   reducers: {
// //     adminLogin: (state, { payload }) => {
// //       state.adminInfo = payload.adminInfo;
// //       state.adminToken = payload.adminToken;
// //     },
// //     adminLogout: (state) => {
// //       state.adminInfo = null;
// //       state.adminToken = null;
// //     },
// //     updateAdminInfo: (state, { payload }) => {
// //       if (state.adminInfo) {
// //         state.adminInfo = { ...state.adminInfo, ...payload };
// //       }
// //     },

// //     //user reducers
// //     userLogin: (state, { payload }) => {
// //       state.userInfo = payload.userInfo;
// //       state.userToken = payload.userToken;
// //     },
// //     userLogout: (state) => {
// //       state.userInfo = null;
// //       state.userToken = null;
// //     },
// //     updateUserInfo: (state, { payload }) => {
// //       if (state.userInfo) {
// //         state.userInfo = { ...state.userInfo, ...payload };
// //       }
// //     },

// //     // Add to Cart
// //     addToCart: (state, { payload }) => {
// //       const existingItem = state.cartItems.find(item => item.id === payload.id);
// //       if (existingItem) {
// //         existingItem.quantity += payload.quantity;
// //         existingItem.subtotal = existingItem.price * existingItem.quantity;
// //       } else {
// //         state.cartItems.push({ ...payload, subtotal: payload.price * payload.quantity });
// //       }
// //       state.totalQuantity += payload.quantity;
// //       state.totalAmount += payload.price * payload.quantity;
// //     },

// //     // Update cart quantity
// //     updateCartQuantity: (state, { payload }) => {
// //       const item = state.cartItems.find(item => item.id === payload.id);
// //       if (item) {
// //         const oldSubtotal = item.subtotal;
// //         item.quantity = payload.quantity;
// //         item.subtotal = item.price * item.quantity;

// //         // Recalculate totals
// //         state.totalQuantity += payload.quantity - item.quantity; // Adjust totalQuantity
// //         state.totalAmount += item.subtotal - oldSubtotal; // Adjust totalAmount
// //       }
// //     },

// //     // Remove from cart
// //     removeFromCart: (state, { payload: id }) => {
// //       const item = state.cartItems.find(item => item.id === id);
// //       if (item) {
// //         state.totalQuantity -= item.quantity;
// //         state.totalAmount -= item.subtotal;
// //         state.cartItems = state.cartItems.filter(item => item.id !== id);
// //       }
// //     },
// //     updateField: (state, action) => {
// //       state.DeliveryDetail[action.payload.field] = action.payload.value;
// //     },
// //     clearCart: (state) => {
// //       state.cartItems = [];
// //       state.totalAmount = 0;
// //       state.totalQuantity = 0;
// //     },
// //   },
// // });

// // export const { adminLogin, adminLogout, updateAdminInfo, userLogin, clearCart, userLogout, updateUserInfo, updateField, addToCart, updateCartQuantity, removeFromCart } = MySlice.actions;
// // export default MySlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const MySlice = createSlice({
//   name: "user",
//   initialState: {
//     adminInfo: null,
//     adminToken: null,
//     userInfo: null,
//     userToken: null,
//     driverInfo: null,
//     driverToken: null,
//     userOnboarded:false,
//     driverOnboarded:false,
//   },
//   reducers: {
//     // Admin actions
//     adminLogin: (state, { payload }) => {
//       state.adminInfo = payload.adminInfo;
//       state.adminToken = payload.adminToken;
//     },
//     adminLogout: (state) => {
//       state.adminInfo = null;
//       state.adminToken = null;
//     },
//     updateAdminInfo: (state, { payload }) => {
//       if (state.adminInfo) {
//         state.adminInfo = { ...state.adminInfo, ...payload };
//       }
//     },

//     // User actions
//     userLogin: (state, { payload }) => {
//       state.userInfo = payload.userInfo;
//       state.userToken = payload.userToken;
//     },
//     userLogout: (state) => {
//       state.userInfo = null;
//       state.userToken = null;
//     },
//     updateUserInfo: (state, { payload }) => {
//       if (state.userInfo) {
//         state.userInfo = { ...state.userInfo, ...payload };
//       }
//     },

//     // Driver actions
//     driverLogin: (state, { payload }) => {
//       state.driverInfo = payload.driverInfo;
//       state.driverToken = payload.driverToken;
//     },
//     driverLogout: (state) => {
//       state.driverInfo = null;
//       state.driverToken = null;
//     },
//     updateDriverInfo: (state, { payload }) => {
//       if (state.driverInfo) {
//         state.driverInfo = { ...state.driverInfo, ...payload };
//       }
//     },
//     updateUserOnboarded: (state) => {
//       state.userOnboarded = true;
//     },

//     updateDriverOnboarded: (state) => {
//       state.driverOnboarded = true;
//     },
//   },
// });

// export const {
//   adminLogin,
//   adminLogout,
//   updateAdminInfo,
//   userLogin,
//   userLogout,
//   updateUserInfo,
//   driverLogin,
//   driverLogout,
//   updateDriverInfo,
//   updateUserOnboarded,
//   updateDriverOnboarded
// } = MySlice.actions;

// export default MySlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    adminInfo: null,
    adminToken: null,
    userInfo: null,
    userToken: null,
    driverInfo: null,
    driverToken: null,
    userOnboarded: false,
    driverOnboarded: false,
  },
  reducers: {
    // Admin actions
    adminLogin: (state, { payload }) => {
      state.adminInfo = payload.adminInfo;
      state.adminToken = payload.adminToken;
    },
    adminLogout: (state) => {
      state.adminInfo = null;
      state.adminToken = null;
    },
    updateAdminInfo: (state, { payload }) => {
      if (state.adminInfo) {
        state.adminInfo = { ...state.adminInfo, ...payload };
      }
    },

    // User actions
    userLogin: (state, { payload }) => {
      state.userInfo = payload.userInfo;
      state.userToken = payload.userToken;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.userToken = null;
     
    },
    updateUserInfo: (state, { payload }) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...payload };
      }
    },

    // Driver actions
    driverLogin: (state, { payload }) => {
      state.driverInfo = payload.driverInfo;
      state.driverToken = payload.driverToken;
    },
    driverLogout: (state) => {
      state.driverInfo = null;
      state.driverToken = null;
   
    },
    updateDriverInfo: (state, { payload }) => {
      if (state.driverInfo) {
        state.driverInfo = { ...state.driverInfo, ...payload };
      }
    },

    // ✅ Ensure these updates don't affect each other
    updateUserOnboarded: (state, { payload }) => {
      state.userOnboarded = payload; 
    },
    
    updateDriverOnboarded: (state, { payload }) => {
      state.driverOnboarded = payload;
    },
  },
});

export const {
  adminLogin,
  adminLogout,
  updateAdminInfo,
  userLogin,
  userLogout,
  updateUserInfo,
  driverLogin,
  driverLogout,
  updateDriverInfo,
  updateUserOnboarded,
  updateDriverOnboarded,
} = MySlice.actions;

export default MySlice.reducer;
