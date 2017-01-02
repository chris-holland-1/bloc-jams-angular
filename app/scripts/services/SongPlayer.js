(function() {
    function SongPlayer() {
        
         /**
         * @desc Service will return this object, making its properties & methods public to the rest of the application
         * @type {Object}
        */
        
        var SongPlayer = {};
        
        /**
        * @desc The song currently being referenced for an action - play or pause
        * @type {Object}
        */
        
        var currentSong = null;
        
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
                currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
         var playSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.play();
                currentSong.playing = !null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            song.playing = true;
        };
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                }
            }        
        }
    };
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();