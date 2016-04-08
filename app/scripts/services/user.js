angular.module('kondeoHomeApp')
  .factory('User', ['$resource', function($resource) {

    return $resource(window.location.protocol + "//" + window.location.hostname + ":3000/" + 'users/:Id',
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
                params: { token: 'token'},
                url: window.location.protocol + "//" + window.location.hostname + ":3000/" + 'users/self/:token',
                isArray: false
            },

            get: {
                method: 'GET',
                params: { token: 'token'},
                url: window.location.protocol + "//" + window.location.hostname + ":3000/" + 'users/self/:token'
            }

        } );

}]);
