/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the privacy page plugin.
------------------------------------------------------------------------------------------------- */
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import config from 'config';
// import StaticContent from '../collections/StaticContent';
const { invoicePath } = config.get('smtp');

export default {
  name: 'FAQs',
  version: '1.0.0',
  register: (server, options) => {
    server.route({
      path: '/faqs',
      method: 'GET',
      handler: async (request, h) => {
        const templatepath = path.join(__dirname, `${invoicePath}FAQs.html`);
        const mainTemp = fs.readFileSync(path.resolve(`${templatepath}`), 'UTF-8');
        let template = handlebars.compile(mainTemp);
        let replacements = {};

        // Find FAQs content and show result.
        const cond = {
          type: 'faqs'
        };
        // let result = await StaticContent.findRecordByCondition(cond);
        // if (result) {
        //   replacements = {
        //     ...replacements,
        //     content: result.content
        //   };
        // }
        return template(replacements);
      }
    });
  }
};
