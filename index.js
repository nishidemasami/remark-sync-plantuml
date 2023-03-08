import { visit } from 'unist-util-visit';
import { plantuml } from 'sync-plantuml';

/**
 * Plugin for remark-js
 *
 * See details about plugin API:
 * https://github.com/unifiedjs/unified#plugin
 */
export const remarkPlantumlPlugin = () => (syntaxTree) => {
	visit(syntaxTree, 'code', (node) => {
		const { value, lang } = node;
		if (lang === 'plantuml') {
			node.type = 'html';
			node.value = plantuml(
				value.replace(/^```plantuml\n/gms, '').replace(/\n```/gms, '')
			);
		}
	});
	return syntaxTree;
};

export default remarkPlantumlPlugin;
