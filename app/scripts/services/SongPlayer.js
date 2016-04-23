(function(){
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    
/**
 * @desc Fixtures album object
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
        formats:  ['mp3'],
        preload: true
      });
      
      SongPlayer.currentSong = song;
    };
    
/**
 * @function getSongIndex
 * @desc returns the track number (array index) for the currently playing song
 * @param {Object} song
 * @returns number (index of song in album)
 */
    var getSongIndex = function(song) {
      
      var title = song.title;
      var albumArray = currentAlbum.songs;
      console.log(albumArray);
      var index = -1;
      
      for (var i = 0; i < albumArray.length; i++) {
        if (albumArray[i].title == title) {
          index = i;
        }
      }
      
      return index;
    };
    
/**
 * @desc Buzz object audio file - placeholder for the current song playing, null for none
 * @type {Object}
 */
    SongPlayer.currentSong = null;
    
/**
 * @function playSong
 * @function playSong
 * @desc plays the currentBuzzObject and set playing property of the song object to true
 * @param {Object} song
 * @returns none
 */  
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

/**
 * @function .play
 * @desc Plays the current clicked song 
 * @param {Object} song
 */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      // if the clicked song is not the same as the song playing, stop the playing song
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
      // otherwise check to see if the song is paused and play
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    
/**
 * @function .pause
 * @desc Pauses a currently playing song
 * @param {Object} song
 */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };


/**
 * @function .previous
 * @desc changes currently playing song to the prior (currentSong - 1) song
 * @param {Object} song
 */
    SongPlayer.previous = function() {
      
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
  
/**
 * @function .next
 * @desc Changes currently playing song to the next (currentSong + 1) song
 * @param {Object} song
 */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
    };
    
    return SongPlayer;
  }
  
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  
})();