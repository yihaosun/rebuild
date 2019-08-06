const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles,
    perms: state => state.user.perms,
    permission_routes: state => state.permission.routes,
    addRouters: state => state.permission.addRouters,
    cachedViews: state => state.tagsView.cachedViews,
}
export default getters