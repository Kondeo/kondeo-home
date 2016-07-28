angular.module('kondeoHomeApp')
  .factory('User', ['$resource', function($resource) {

    return $resource(API_BASE + 'users/:Id',
        { Id: '@Id' }, {
            register: {
                method: 'POST',
                params: { Id: 'register' }
            },

            login: {
                method: 'POST',
                params: { Id: 'login' }
            },

            update: {
                method: 'PUT',
                params: { token: '@token'},
                url: API_BASE + 'users/self/:token'
            },

            get: {
                method: 'GET',
                params: { token: '@token'},
                url: API_BASE + 'users/self/:token'
            },

            getAll: {
                method: 'GET',
                url: API_BASE + 'users',
                isArray: true
            }

        } );

}]);
