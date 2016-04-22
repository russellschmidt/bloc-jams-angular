(function() {
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
    this.albumSongs = [];
    
    console.log(this.albumData)
    
    for (var i = 0; i < this.albumData.songs.length; i++) {
      this.albumSongs.push(angular.copy(this.albumData.songs[i]));
      this.albumSongs[i].duration = Math.floor(this.albumSongs[i].duration/60) + ":" +
        Math.floor(this.albumSongs[i].duration%60);
    }
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);

})();
