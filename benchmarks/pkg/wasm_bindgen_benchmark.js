import { jsthunk, add as add2, Foo } from '../globals.js';

let wasm;

/**
* @param {number} n
* @returns {void}
*/
export function call_js_thunk_n_times(n) {
    return wasm.call_js_thunk_n_times(n);
}

/**
* @param {number} n
* @param {number} a
* @param {number} b
* @returns {void}
*/
export function call_js_add_n_times(n, a, b) {
    return wasm.call_js_add_n_times(n, a, b);
}

/**
* @returns {void}
*/
export function thunk() {
    return wasm.thunk();
}

/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a, b) {
    return wasm.add(a, b);
}

/**
* @param {number} n
* @returns {number}
*/
export function fibonacci(n) {
    return wasm.fibonacci(n);
}

/**
* @returns {number}
*/
export function fibonacci_high() {
    return wasm.fibonacci_high();
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {number} n
* @param {any} foo
* @returns {void}
*/
export function call_foo_bar_final_n_times(n, foo) {
    try {
        return wasm.call_foo_bar_final_n_times(n, addBorrowedObject(foo));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {number} n
* @param {any} foo
* @returns {void}
*/
export function call_foo_bar_structural_n_times(n, foo) {
    try {
        return wasm.call_foo_bar_structural_n_times(n, addBorrowedObject(foo));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {number} n
* @returns {void}
*/
export function call_doesnt_throw_n_times(n) {
    return wasm.call_doesnt_throw_n_times(n);
}

/**
* @param {number} n
* @returns {void}
*/
export function call_doesnt_throw_with_catch_n_times(n) {
    return wasm.call_doesnt_throw_with_catch_n_times(n);
}

/**
* @param {number} n
* @param {any} element
* @returns {void}
*/
export function call_first_child_final_n_times(n, element) {
    try {
        return wasm.call_first_child_final_n_times(n, addBorrowedObject(element));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {number} n
* @param {any} element
* @returns {void}
*/
export function call_first_child_structural_n_times(n, element) {
    try {
        return wasm.call_first_child_structural_n_times(n, addBorrowedObject(element));

    } finally {
        heap[stack_pointer++] = undefined;

    }

}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

let WASM_VECTOR_LEN = 0;

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function passArrayJsValueToWasm(array) {
    const ptr = wasm.__wbindgen_malloc(array.length * 4);
    const mem = getUint32Memory();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @param {number} n
* @param {any[]} elements
* @returns {void}
*/
export function call_node_first_child_n_times(n, elements) {
    const ptr1 = passArrayJsValueToWasm(elements);
    const len1 = WASM_VECTOR_LEN;
    return wasm.call_node_first_child_n_times(n, ptr1, len1);
}

/**
* @param {number} n
* @param {any[]} elements
* @returns {void}
*/
export function call_node_node_type_n_times(n, elements) {
    const ptr1 = passArrayJsValueToWasm(elements);
    const len1 = WASM_VECTOR_LEN;
    return wasm.call_node_node_type_n_times(n, ptr1, len1);
}

/**
* @param {number} n
* @param {any[]} elements
* @returns {void}
*/
export function call_node_has_child_nodes_n_times(n, elements) {
    const ptr1 = passArrayJsValueToWasm(elements);
    const len1 = WASM_VECTOR_LEN;
    return wasm.call_node_has_child_nodes_n_times(n, ptr1, len1);
}

/**
* @param {any} element
* @returns {void}
*/
export function count_node_types(element) {
    return wasm.count_node_types(addHeapObject(element));
}

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}
/**
* @param {string} s
* @returns {string}
*/
export function str_roundtrip(s) {
    const ptr0 = passStringToWasm(s);
    const len0 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    wasm.str_roundtrip(retptr, ptr0, len0);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getStringFromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 1);
    return realRet;

}

function doesNotExist() {
    throw new Error('imported function or type does not exist');
}

function getObject(idx) { return heap[idx]; }

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
return {}
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_jsthunk_3d95b07d1ee2b76a = typeof jsthunk === 'undefined' ? doesNotExist : jsthunk;
    imports.wbg.__wbg_add_0a6e59f79e9fbd6e = typeof add2 === 'undefined' ? doesNotExist : add2;
    imports.wbg.__wbg_bar_be39433b107f574c = function(arg0) {
        Foo.prototype.bar.call(getObject(arg0));
    };
    imports.wbg.__wbg_bar_ecb09d67d012d94e = function(arg0) {
        getObject(arg0).bar();
    };
    imports.wbg.__wbg_jsthunk_0e5d53c7f08f8130 = typeof jsthunk === 'undefined' ? doesNotExist : jsthunk;
    imports.wbg.__wbg_jsthunk_06330a0180a79545 = function() {
        try {
            jsthunk();
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_firstChild_a71694b74dc435f3 = function(arg0) {
        return addHeapObject(GetOwnOrInheritedPropertyDescriptor(Element.prototype, 'firstChild').get.call(getObject(arg0)));
    };
    imports.wbg.__wbg_firstChild_708a5ee860a65e50 = function(arg0) {
        return addHeapObject(getObject(arg0).firstChild);
    };
    imports.wbg.__widl_f_has_child_nodes_Node = function(arg0) {
        return getObject(arg0).hasChildNodes();
    };
    imports.wbg.__widl_f_node_type_Node = function(arg0) {
        return getObject(arg0).nodeType;
    };
    imports.wbg.__widl_f_first_child_Node = function(arg0) {

        const val = getObject(arg0).firstChild;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_next_sibling_Node = function(arg0) {

        const val = getObject(arg0).nextSibling;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

