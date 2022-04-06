import { paths } from "./pte";
import { Fetcher } from "openapi-typescript-fetch";
import { ManifestBuilder } from "./manifest";

// declare fetcher for paths
const fetcher = Fetcher.for<paths>();

// global configuration
fetcher.configure({
    baseUrl: "http://api.example.com/v1",
    init: {
        headers: {
            Accept: "application/json",
        }
    },
    use: []
});

// create fetch operations
const getUsers = fetcher.path("/users").method("get").create();

// fetch
const users = getUsers({});
console.log(users);

// use manifest builder
const manifest = new ManifestBuilder()
    .clearAuthZone()
    .build();
console.log(manifest);