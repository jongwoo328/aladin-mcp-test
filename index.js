import { McpServer } from '@modelcontextprotocol/sdk/dist/cjs/server/mcp';
import * as sqlite from 'sqlite3';

const db = new sqlite.Database('./db.sqlite');

const server = new McpServer({
	name: 'aladinmcp',
	version: '1.0.0',
});

server.resource('book_categories_distinct', 'book_category://', async (uri) => {
	const categories = await new Promise((resolve, reject) => {
		db.all(
			'SELECT cid, DISTINCT category, mall, depth1, depth2, depth3, depth4, depth5 FROM category',
			(err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			},
		);
	});

	return {
		contents: categories.map((category) => ({
			uri: `book_category://${category.cid}`,
			text: JSON.stringify(category),
			mimeType: 'application/json',
		})),
	};
});
