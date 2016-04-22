(function(){
  function SongPlayer() {
    var SongPlayer = {};
    
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
        formats:  ['mp3'],
        preload: true
      });
      
      currentSong = song;
    }

/**
 * @function .play
 * @desc Plays the current clicked song 
 * @param {Object} song
 */
    SongPlayer.play = function(song) {
      // if the clicked song is not the same as the song playing, stop the playing song
      if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      } else if (currentSong === song) {
      // otherwise check to see if the song is paused and play
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
          song.playing = true;
        }
      }
    };
    
/**
 * @function .pause
 * @desc Pauses a currently playing song
 * @param {Object} song
 */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  
})();