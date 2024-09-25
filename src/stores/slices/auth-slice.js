

export const createAuthSlice = (set) => ({
  userInfo: { email: "", id: "" }, 
  setUserInfo: (userInfo) => {
    console.log("Setting userInfo:", userInfo); 
    set((state) => ({
      userInfo: { ...state.userInfo, ...userInfo },
    }));
  },
});


