import {reactive, UnwrapNestedRefs} from 'vue';

export function defQuery(): UnwrapNestedRefs<{ where: {}; page: {}; order: {} }> {
    return reactive({
        where: {},
        order: {},
        page: {}
    });
}