angular.module('kondeoHomeApp')
  .factory('User', ['$resource', function($resource) {

    return $resource(API_BASE + 'users/:Id',
        { Id: '@Id' }, {
            register: {
                method: 'POST',
                params: { Id: 'register' },
                isArray: false
            },

            login: {
                method: 'POST',
                params: { Id: 'login' },
                isArray: false
            },

            update: {
                method: 'PUT',
                params: { token: '@token'},
                url: API_BASE + 'users/self/:token',
                isArray: false
            },

            get: {
                method: 'GET',
                params: { token: '@token'},
                url: API_BASE + 'users/self/:token'
            }

        } );

}]);
