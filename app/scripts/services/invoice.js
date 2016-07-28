angular.module('kondeoHomeApp')
  .factory('User', ['$resource', function($resource) {

    return $resource(API_BASE + 'users/:Id',
        { Id: '@Id' }, {
            create: {
                method: 'POST',
                params: { },
                isArray: false
            },

            getAll: {
                method: 'GET',
                params: { },
                url: API_BASE + 'users/self/:token'
            }

        } );

}]);
