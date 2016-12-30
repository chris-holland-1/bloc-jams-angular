(function() {
    function CollectionCtrl(Fixtures) {
        this.album = Fixtures.getCollection(12);
       
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
