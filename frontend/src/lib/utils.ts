import { createCn } from "cn/config";

// Tailles de texte du DS (`--text-*` dans styles.css) : sans cette déclaration,
// `cn` les prend pour des couleurs et écrase `text-primary-foreground` & co.
export const cn = createCn({
	extend: {
		classGroups: {
			"font-size": [
				{
					text: [
						"display",
						"display-sm",
						"title",
						"heading",
						"body-lg",
						"body",
						"label",
						"overline",
					],
				},
			],
		},
	},
});
