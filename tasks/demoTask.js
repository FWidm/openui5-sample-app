const stringReplacer = require('@ui5/builder/lib/processors/stringReplacer');
/**
 * Custom task example
 *
 * @param {Object} parameters Parameters
 * @param {module:@ui5/fs.DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {module:@ui5/fs.AbstractReader} parameters.dependencies Reader or Collection to read dependency files
 * @param {Object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise<undefined>} Promise resolving with <code>undefined</code> once data has been written
 */
module.exports = async function ({workspace, dependencies, options}) {
	console.log(options);
	/**
	 * Find all xml files that have view or fragment in their names
	 * @type {string}
	 */
	const pattern = '/**/*.{view,fragment}.xml';
	/**
	 * replace the baseurl pattern with this string
	 * @type {string}
	 */
	const baseUrl = 'http://base.com/url';

	workspace.byGlob(pattern)
		.then((allResources) => {
			console.log(allResources);
			// replace(allResources,{'pattern':'xy'})
		});

	return workspace.byGlob(pattern)
		.then((allResources) => {
			return stringReplacer({
				resources: allResources,
				options: {
					pattern: "@@baseUrl",
					replacement: baseUrl
				}
			});
		})
		.then((processedResources) => {
			return Promise.all(processedResources.map((resource) => {
				return workspace.write(resource);
			}));
		});
};

