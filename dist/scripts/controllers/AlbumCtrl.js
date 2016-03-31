(function() {
  function AlbumCtrl(){
    this.albumData = albumPicasso;
    //console.log(this.albumData);
    this.albumSongs = [];

    for (var i = 0; i < this.albumData.songs.length; i++) {
      this.albumSongs.push(angular.copy(albumPicasso.songs[i]));
    }
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);

})();
