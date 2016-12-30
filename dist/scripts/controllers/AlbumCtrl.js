(function() {
    function AlbumCtrl() {
        console.log("controller loaded!");
        this.albumData = albumPicasso;  
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();