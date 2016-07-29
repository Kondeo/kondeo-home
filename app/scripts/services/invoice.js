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
                url: API_BASE + 'invoices/self'
            },

            update: {
                method: 'PUT',
                params: { id: "@id" },
                url: API_BASE + 'invoices/:id'
            }

        } );

}]);
