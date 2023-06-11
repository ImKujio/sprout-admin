import {reactive, UnwrapNestedRefs} from "vue";

export function defDialog(): UnwrapNestedRefs<{ open: Boolean; loading: Boolean; title: String }> {
    return reactive({
        open: false,
        loading: false,
        title: ""
    });
}