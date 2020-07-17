/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the public files plugin.
------------------------------------------------------------------------------------------------- */

export default {
  name: 'Public',
  version: '1.0.0',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          path: 'public/',
          redirectToSlash: true,
          index: false,
          listing: false
        }
      }
    });
  }
};
