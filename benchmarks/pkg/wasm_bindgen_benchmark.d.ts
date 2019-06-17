/* tslint:disable */
/**
* @param {number} n 
* @returns {void} 
*/
export function call_js_thunk_n_times(n: number): void;
/**
* @param {number} n 
* @param {number} a 
* @param {number} b 
* @returns {void} 
*/
export function call_js_add_n_times(n: number, a: number, b: number): void;
/**
* @returns {void} 
*/
export function thunk(): void;
/**
* @param {number} a 
* @param {number} b 
* @returns {number} 
*/
export function add(a: number, b: number): number;
/**
* @param {number} n 
* @returns {number} 
*/
export function fibonacci(n: number): number;
/**
* @returns {number} 
*/
export function fibonacci_high(): number;
/**
* @param {number} n 
* @param {any} foo 
* @returns {void} 
*/
export function call_foo_bar_final_n_times(n: number, foo: any): void;
/**
* @param {number} n 
* @param {any} foo 
* @returns {void} 
*/
export function call_foo_bar_structural_n_times(n: number, foo: any): void;
/**
* @param {number} n 
* @returns {void} 
*/
export function call_doesnt_throw_n_times(n: number): void;
/**
* @param {number} n 
* @returns {void} 
*/
export function call_doesnt_throw_with_catch_n_times(n: number): void;
/**
* @param {number} n 
* @param {any} element 
* @returns {void} 
*/
export function call_first_child_final_n_times(n: number, element: any): void;
/**
* @param {number} n 
* @param {any} element 
* @returns {void} 
*/
export function call_first_child_structural_n_times(n: number, element: any): void;
/**
* @param {number} n 
* @param {any[]} elements 
* @returns {void} 
*/
export function call_node_first_child_n_times(n: number, elements: any[]): void;
/**
* @param {number} n 
* @param {any[]} elements 
* @returns {void} 
*/
export function call_node_node_type_n_times(n: number, elements: any[]): void;
/**
* @param {number} n 
* @param {any[]} elements 
* @returns {void} 
*/
export function call_node_has_child_nodes_n_times(n: number, elements: any[]): void;
/**
* @param {any} element 
* @returns {void} 
*/
export function count_node_types(element: any): void;
/**
* @param {string} s 
* @returns {string} 
*/
export function str_roundtrip(s: string): string;

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path?: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        