const csv = require('csv-parser');
const fs = require('node:fs');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('../db.sqlite');

fs.createReadStream('../fixtures/aladin_category.csv')
	.pipe(csv())
	.on('data', (data) => {
		db.run(
			'INSERT INTO category ' +
				'(cid, category, mall, depth1, depth2, depth3, depth4, depth5) ' +
				'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[
				data.CID,
				data.카테고리명,
				data.몰,
				data['1Depth'] ? data['1Depth'] : null,
				data['2Depth'] ? data['2Depth'] : null,
				data['3Depth'] ? data['3Depth'] : null,
				data['4Depth'] ? data['4Depth'] : null,
				data['5Depth'] ? data['5Depth'] : null,
			],
		);
	})
	.on('end', () => {
		console.log('end');
	});
