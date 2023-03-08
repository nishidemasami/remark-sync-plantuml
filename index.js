import { visit } from 'unist-util-visit';
import { plantuml } from 'sync-plantuml';

/**
 * Plugin for remark-js
 *
 * See details about plugin API:
 * https://github.com/unifiedjs/unified#plugin
 */
export const remarkPlantumlPlugin = () => (syntaxTree) => {
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

export default remarkPlantumlPlugin;
