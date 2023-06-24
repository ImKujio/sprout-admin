/**
 * 返回resource的实际url
 * @param {string|null} path
 * @returns {string|null}
 */
export function resource(path) {
    if (!path) return null
    const base = import.meta.env.VITE_APP_BASE_API;
    return base + '/resource/' + path
}