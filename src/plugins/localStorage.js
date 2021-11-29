export default store => {
    store.subscribe((m, state) => {
        // Save the entire state to Local Storage
      localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('projects', JSON.stringify(state.projects));
    });
};
