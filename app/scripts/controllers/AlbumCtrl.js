(function() {
  function AlbumCtrl(Fixtures){
    this.albumData = Fixtures.getAlbum();
    //console.log(this.albumData);
    this.albumSongs = [];

    for (var i = 0; i < this.albumData.songs.length; i++) {
      this.albumSongs.push(angular.copy(albumPicasso.songs[i]));
      this.albumSongs[i].duration = Math.floor(this.albumSongs[i].duration/60) + ":" +
        Math.floor(this.albumSongs[i].duration%60);
    }
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);

})();
