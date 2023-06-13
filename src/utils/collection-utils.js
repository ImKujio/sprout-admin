/**
 * 将Map转换为树形结构
 * @param {Object.<number,?>} map
 * @param {boolean} copy 复制模式
 */
export function map2Tree(map,copy = true) {
    if (copy){
        const raw = map
        map = {}
        Object.values(raw).forEach(item => {
            map[item.id] = Object.assign({},item)
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
        map[item.id] = Object.assign({},item)
    })
    return map2Tree(map,false)
}

/**
 * 排序tree
 * @param tree
 * @param {String} field 排序字段
 * @param {String} order 正序/倒序
 */
export function sortTree(tree, field, order = 'asc') {
    tree.sort((a, b) => {
        if (order === 'asc') {
            return a[field] - b[field];
        } else {
            return b[field] - a[field];
        }
    });

    tree.forEach((node) => {
        if (!!node.children && node.children.length > 0) {
            sortTree(node.children, field, order);
        }
    });
}
