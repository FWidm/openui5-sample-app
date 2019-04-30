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
	/**
	 * Find all xml files that have view or fragment in their names
	 * @type {string}
	 */
	const filePattern = '/**/*.{view,fragment}.xml';
	/**
	 * replace the baseurl filePattern with this string
	 * @type {string}
	 */

	const replacement = options.configuration;

	return workspace.byGlob(filePattern)
		.then((allResources) => {

			return stringReplacer({
				resources: allResources,
				options: {
					pattern: replacement['pattern'],
					replacement: replacement['replace']
				}
			});
		})
		.then((processedResources) => {
			return Promise.all(processedResources.map((resource) => {
				return workspace.write(resource);
			}));
		});
};
