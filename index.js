#!/usr/bin/env node
import { createRequire } from 'node:module';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
const require = createRequire(import.meta.url);
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Aladin } from 'aladin-client';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${projectRoot}/db.sqlite`);

const server = new McpServer({
	name: 'aladinmcp',
	version: '1.0.0',
});
const aladin = new Aladin({ ttbKey: process.argv[2] });

server.tool(
	'get_new_books_by_category_id',
	{ cid: z.number() },
	async ({ cid }) => {
		const results = await aladin.listItems({
			queryType: 'ItemNewAll',
			categoryId: cid,
		});

		if (!results.success) {
			return {
				content: [
					{
						type: 'text',
						text: results.error.message,
					},
				],
				isError: true,
			};
		}
		return {
			content: results.data.item.map((item) => {
				return {
					type: 'text',
					text: JSON.stringify(item),
					mimeType: 'application/json',
				};
			}),
		};
	},
);
server.tool(
	'get_bestsellers_by_category_id',
	{ cid: z.number() },
	async ({ cid }) => {
		const results = await aladin.listItems({
			queryType: 'Bestseller',
			categoryId: cid,
		});

		if (!results.success) {
			return {
				content: [
					{
						type: 'text',
						text: results.error.message,
					},
				],
				isError: true,
			};
		}
		return {
			content: results.data.item.map((item) => {
				return {
					type: 'text',
					text: JSON.stringify(item),
					mimeType: 'application/json',
				};
			}),
		};
	},
);
server.tool(
	'search_book_categories',
	{ query: z.string() },
	async ({ query }) => {
		const categories = await new Promise((res, rej) => {
			db.all(
				`SELECT cid, category, mall, depth1, depth2, depth3, depth4, depth5 
					FROM category 
					WHERE category LIKE ? 
					OR depth1 LIKE ? 
					OR depth2 LIKE ?
					OR depth3 LIKE ?
					OR depth4 LIKE ?
					OR depth5 LIKE ?`,
				[
					`%${query}%`,
					`%${query}%`,
					`%${query}%`,
					`%${query}%`,
					`%${query}%`,
					`%${query}%`,
				],
				(err, rows) => {
					if (err) {
						rej(err);
					} else {
						res(rows);
					}
				},
			);
		});
		if (Array.isArray(categories)) {
			return {
				content: categories.map((category) => ({
					type: 'text',
					text: JSON.stringify(category),
					mimeType: 'application/json',
				})),
			};
		}
		return {
			content: [
				{
					type: 'text',
					text: categories.message,
				},
			],
			isError: true,
		};
	},
);
const transport = new StdioServerTransport();
await server.connect(transport);
