(function() {
    const __exports = {};
    let wasm;

    let memory;

    const heap = new Array(32);

    heap.fill(undefined);

    heap.push(undefined, null, true, false);

    let stack_pointer = 32;

    function addBorrowedObject(obj) {
        if (stack_pointer == 1) throw new Error('out of js stack');
        heap[--stack_pointer] = obj;
        return stack_pointer;
    }

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

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
/**
* Entry point invoked by `worker.js`, a bit of a hack but see the \"TODO\" above
* about `worker.js` in general.
* @param {number} ptr
* @returns {void}
*/
__exports.child_entry_point = function(ptr) {
    return wasm.child_entry_point(ptr);
};

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== memory.buffer) {
        cachegetUint8Memory = new Uint8Array(memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().slice(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {


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
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== memory.buffer) {
        cachegetUint32Memory = new Uint32Array(memory.buffer);
    }
    return cachegetUint32Memory;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
*/
class RenderingScene {

    static __wrap(ptr) {
        const obj = Object.create(RenderingScene.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_renderingscene_free(ptr);
    }
    /**
    * Returns the JS promise object which resolves when the render is complete
    * @returns {any}
    */
    promise() {
        return takeObject(wasm.renderingscene_promise(this.ptr));
    }
    /**
    * Return a progressive rendering of the image so far
    * @returns {any}
    */
    imageSoFar() {
        return takeObject(wasm.renderingscene_imageSoFar(this.ptr));
    }
}
__exports.RenderingScene = RenderingScene;
/**
*/
class Scene {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_scene_free(ptr);
    }
    /**
    * Creates a new scene from the JSON description in `object`, which we
    * deserialize here into an actual scene.
    * @param {any} object
    * @returns {}
    */
    constructor(object) {
        try {
            this.ptr = wasm.scene_new(addBorrowedObject(object));

        } finally {
            heap[stack_pointer++] = undefined;

        }

    }
    /**
    * Renders this scene with the provided concurrency and worker pool.
    *
    * This will spawn up to `concurrency` workers which are loaded from or
    * spawned into `pool`. The `RenderingScene` state contains information to
    * get notifications when the render has completed.
    * @param {number} concurrency
    * @param {WorkerPool} pool
    * @returns {RenderingScene}
    */
    render(concurrency, pool) {
        const ptr = this.ptr;
        this.ptr = 0;
        return RenderingScene.__wrap(wasm.scene_render(ptr, concurrency, pool.ptr));
    }
}
__exports.Scene = Scene;
/**
*/
class WorkerPool {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_workerpool_free(ptr);
    }
    /**
    * Creates a new `WorkerPool` which immediately creates `initial` workers.
    *
    * The pool created here can be used over a long period of time, and it
    * will be initially primed with `initial` workers. Currently workers are
    * never released or gc\'d until the whole pool is destroyed.
    *
    * # Errors
    *
    * Returns any error that may happen while a JS web worker is created and a
    * message is sent to it.
    * @param {number} initial
    * @returns {}
    */
    constructor(initial) {
        this.ptr = wasm.workerpool_new(initial);
    }
}
__exports.WorkerPool = WorkerPool;

function init(module, maybe_memory) {

    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_911134b6f1c642fa = function(arg0, arg1, arg2) {
        try {
            return addHeapObject(new ImageData(getObject(arg0), arg1, arg2));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_log_1d841581f9a79c01 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        console.log(varg0);
    };
    imports.wbg.__wbg_log_3ac52022f75a24f0 = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbindgen_json_serialize = function(ret, arg0) {

        const retptr = passStringToWasm(JSON.stringify(getObject(arg0)));
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(varg0);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        return addHeapObject(getObject(arg0));
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        return false;
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        return addHeapObject(arg0);
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        return getObject(arg0) === getObject(arg1);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        return addHeapObject(new Error());
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).stack);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);

        varg0 = varg0.slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);

        console.error(varg0);
    };
    imports.wbg.__widl_f_post_message_DedicatedWorkerGlobalScope = function(arg0, arg1) {
        try {
            getObject(arg0).postMessage(getObject(arg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_ErrorEvent = function(arg0) {
        return getObject(arg0) instanceof ErrorEvent;
    };
    imports.wbg.__widl_f_message_ErrorEvent = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).message);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_f_type_Event = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).type);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_instanceof_MessageEvent = function(arg0) {
        return getObject(arg0) instanceof MessageEvent;
    };
    imports.wbg.__widl_f_new_Worker = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        try {
            return addHeapObject(new Worker(varg0));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_post_message_Worker = function(arg0, arg1) {
        try {
            getObject(arg0).postMessage(getObject(arg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_onmessage_Worker = function(arg0, arg1) {
        getObject(arg0).onmessage = getObject(arg1);
    };
    imports.wbg.__widl_f_set_onerror_Worker = function(arg0, arg1) {
        getObject(arg0).onerror = getObject(arg1);
    };
    imports.wbg.__wbg_call_90045f2b8d244177 = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_new_e980081ecf7d7090 = function() {
        return addHeapObject(new Array());
    };
    imports.wbg.__wbg_push_f353715bd66c5b3f = function(arg0, arg1) {
        return getObject(arg0).push(getObject(arg1));
    };
    imports.wbg.__wbg_newnoargs_3b5b9eb6cc86e4f9 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_call_00ca88af7ddffcb2 = function(arg0, arg1, arg2) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_new_9c838f4359f58c31 = function(arg0, arg1) {
        let cbarg0 = function(arg0, arg1) {
            let a = this.a;
            this.a = 0;
            try {
                return this.f(a, this.b, addHeapObject(arg0), addHeapObject(arg1));

            } finally {
                this.a = a;

            }

        };
        cbarg0.f = wasm.__wbg_function_table.get(177);
        cbarg0.a = arg0;
        cbarg0.b = arg1;
        try {
            return addHeapObject(new Promise(cbarg0.bind(cbarg0)));
        } finally {
            cbarg0.a = cbarg0.b = 0;

        }
    };
    imports.wbg.__wbg_resolve_64b892034de12a92 = function(arg0) {
        return addHeapObject(Promise.resolve(getObject(arg0)));
    };
    imports.wbg.__wbg_then_e661fbb3e525051f = function(arg0, arg1) {
        return addHeapObject(getObject(arg0).then(getObject(arg1)));
    };
    imports.wbg.__wbg_buffer_74c31393db5a71c2 = function(arg0) {
        return addHeapObject(getObject(arg0).buffer);
    };
    imports.wbg.__wbg_new_d359ae1db909b381 = function(arg0) {
        return addHeapObject(new Uint8ClampedArray(getObject(arg0)));
    };
    imports.wbg.__wbg_slice_8d6c1c4449a49d23 = function(arg0, arg1, arg2) {
        return addHeapObject(getObject(arg0).slice(arg1 >>> 0, arg2 >>> 0));
    };
    imports.wbg.__wbindgen_debug_string = function(ret, arg0) {

        const retptr = passStringToWasm(debugString(getObject(arg0)));
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_module = function() {
        return addHeapObject(init.__wbindgen_wasm_module);
    };
    imports.wbg.__wbindgen_memory = function() {
        return addHeapObject(memory);
    };
    imports.wbg.__wbindgen_closure_wrapper211 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(60);
        const d = wasm.__wbg_function_table.get(61);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, addHeapObject(arg0));

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };
    imports.wbg.__wbindgen_closure_wrapper280 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(101);
        const d = wasm.__wbg_function_table.get(102);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, addHeapObject(arg0));

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {
        memory = imports.wbg.memory = new WebAssembly.Memory({initial:17,maximum:16384,shared:true});
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
        memory = imports.wbg.memory = maybe_memory;
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
        wasm.__wbindgen_start();
        return wasm;
    });
}

self.wasm_bindgen = Object.assign(init, __exports);

})();
