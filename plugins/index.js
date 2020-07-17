/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

import config from 'config';
import Good from 'good';
import Inert from 'inert';
import Vision from 'vision';
import Public from './public';
import FAQs from './faqs';
import Rest from './rest';

const app = config.get('app');

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
export default [
  /* -----------------------
        Register inert
      ------------------------ */
  {
    plugin: Inert,
    options: {}
  },

  /* -----------------------
        Register vision
      ------------------------ */
  {
    plugin: Vision,
    options: {}
  },
  /* ------------------
        Register good
      ------------------ */

  {
    plugin: Good,
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [
              {
                log: '*',
                response: '*'
              }
            ]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  },

  /* ---------------------------
        Setting up the jwt auth.
      ---------------------------- 
  {
    plugin: Auth,
    options: {},
  },
*/
  /* ---------------------------
        Restfull Api's.
      ---------------------------- */
  {
    plugin: Rest,
    options: {}
  },

  /* ---------------------------
        Init the public route.
      ---------------------------- */
  {
    plugin: Public,
    options: {}
  },

  {
    plugin: FAQs,
    options: {}
  }
];
