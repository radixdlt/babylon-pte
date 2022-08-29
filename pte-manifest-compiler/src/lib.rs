mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

// PTE v0.5 is not validating signatures. The methods below does not
// generate a well-formed transaction for signing. 
// This is expectedly to be fixed by AlphaNet SDK.

#[wasm_bindgen]
pub fn compile(manifest: &str) -> Result<Vec<u8>, String> {
    utils::set_panic_hook();
    let transaction = transaction::manifest::compile(
        manifest,
        &radix_engine::types::NetworkDefinition::local_simulator(),
    )
    .map_err(|e| format!("{:?}", e))?;
    Ok(scrypto::buffer::scrypto_encode(&transaction))
}

#[wasm_bindgen]
pub fn compile_with_nonce(manifest: &str, _nonce: u64) -> Result<Vec<u8>, String> {
    utils::set_panic_hook();
    let transaction = transaction::manifest::compile(
        manifest,
        &radix_engine::types::NetworkDefinition::local_simulator(),
    )
    .map_err(|e| format!("{:?}", e))?;
    Ok(scrypto::buffer::scrypto_encode(&transaction))
}
