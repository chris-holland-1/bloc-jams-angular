(function() {
    function AlbumCtrl(Fixtures) {
        console.log("controller loaded!");
        this.albumData = Fixtures.getAlbum();  
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();