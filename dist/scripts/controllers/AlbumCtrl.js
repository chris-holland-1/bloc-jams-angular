(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        console.log("controller loaded!");
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();