import {McpServer, ResourceTemplate} from "@modelcontextprotocol/sdk/dist/cjs/server/mcp";
import fs from "fs";

const server = new McpServer({
    name: "aladinmcp",
    version: "1.0.0"
})

const bookCategories = []
function getBookCategory() {
    if (bookCategories.length === 0) {


    }

}

server.resource(
    "book_category",
    new ResourceTemplate("book_category://{?query}", {list: undefined}),
    async (uri, {query}) => {

    }
)