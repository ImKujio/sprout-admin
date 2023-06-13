/**
 * 将Map转换为树形结构
 * @param {Object.<number,?>} map
 * @param copy
 */
export function map2Tree(map,copy = true) {
    if (copy){
        const raw = map
        map = {}
        Object.values(raw).forEach(item => {
            map[item.id] = Object.assign(item)
        })
    }
    const tree = []
    Object.values(map).forEach(item => {
        const parent = map[item.pid];
        if (parent) {
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(map[item.id]);
        } else {
            tree.push(map[item.id]);
        }
    })
    return tree
}

/**
 * 将数组转换为树形结构
 * @param {Array} list
 */
export function list2Tree(list) {
    const map = {}
    list.forEach(item => {
        map[item.id] = Object.assign(item)
    })
    return map2Tree(map,false)
}
