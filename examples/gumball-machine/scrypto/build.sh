#!/bin/bash

set -x
set -e

cd "$(dirname "$0")"

(cd gumball-machine; scrypto build; cp target/wasm32-unknown-unknown/release/gumball_machine.wasm ../../public)
(cd gumball-machine; resim publish target/wasm32-unknown-unknown/release/gumball_machine.wasm --manifest ../../public/gumball_machine.rtm)