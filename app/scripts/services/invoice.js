angular.module('kondeoHomeApp')
  .factory('Invoice', ['$resource', function($resource) {

    return $resource(API_BASE + 'invoices',
        { }, {
            create: {
                method: 'POST',
                isArray: false
            },

            getAll: {
                method: 'GET'
            },

            get: {
                method: 'GET',
                url: API_BASE + 'self'
            }

        } );

}]);
