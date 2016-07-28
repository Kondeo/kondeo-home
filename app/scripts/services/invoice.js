angular.module('kondeoHomeApp')
  .factory('Invoice', ['$resource', function($resource) {

    return $resource(API_BASE + 'invoices',
        { }, {
            create: {
                method: 'POST'
            },

            getAll: {
                method: 'GET',
                isArray: true
            },

            get: {
                method: 'GET',
                url: API_BASE + 'self'
            }

        } );

}]);
