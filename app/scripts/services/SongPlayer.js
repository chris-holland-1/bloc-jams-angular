(function() {
    function SongPlayer($rootScope, Fixtures) {
        
         /**
         * @desc Service will return this object, making its properties & methods public to the rest of the application
         * @type {Object}
        */
        
        var SongPlayer = {};
        
        /**
        * @desc Store song information & access the songs array
        * @type {Object}
        */ 
        
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */ 
        
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        
         var playSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.play();
            }
            
            song.playing = true;
        };
        
        var stopSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = !null;
            }
            
            song.playing = null;
        };
        
         /**
        * @desc Get the index of a song 
        * @type {Number}
        */
        
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);  
        };
        
        /**
        * @desc The song currently being referenced for an action - play or pause
        * @type {Object}
        */
        
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        
        SongPlayer.currentTime = null;
        
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        
        SongPlayer.volume = 80;
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                        playSong(song);
                }
            }        
        };
        
        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            console.log("pause!");
            song = song || SongPlayer.currentSong;
            console.log(currentBuzzObject);
            currentBuzzObject.pause();
            song.playing = false;
        };
        
         /**
        * @desc Go to the previous song - get the index of the currently playing song and then decrease that index by one
        * @type {Number}
        */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            if(currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
         /**
        * @desc Go to the next song - get the index of the currently playing song and then increase that index by one
        * @type {Number}
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
        
            if(currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }    
        };
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();