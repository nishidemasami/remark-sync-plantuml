const visit = require("unist-util-visit");
const { resolve } = require('path');
const { execSync } = require('child_process');

const plantuml = (uml) => {
	const plantumlJar = resolve(__dirname, '../vendor/plantuml.jar');
	const result = execSync(
		[
			'java',
			'-jar',
			'-Djava.awt.headless=true',
			'--add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.trax="ALL-UNNAMED"',
			plantumlJar,
			'-tsvg',
			'-pipe',
		].join(' '),
		{ input: uml }
	);

	return result.toString();
};

/**
 * Plugin for remark-js
 *
 * See details about plugin API:
 * https://github.com/unifiedjs/unified#plugin
 */
const remarkPlantumlPlugin = () => (syntaxTree) => {
	visit(syntaxTree, 'text', (node) => {
		const { value } = node;
		const matched = value.match(/^```plantuml\n(.+)\n```$/gms);
		if (matched) {
			node.type = 'html';
			node.value = plantuml(
				value.replace(/^```plantuml\n/gms, '').replace(/\n```/gms, '')
			);
		}
	});
	return syntaxTree;
};

module.exports = { remarkPlantumlPlugin, plantuml };
