'use strict';

const vp_domContainer = document.querySelector('#jis-video-player');
const vp = React.createElement;

const vp_base_url = base_url || vp_domContainer.dataset.basUrl;

const jm_default = vp_base_url + "/assets/img/jm_default.jpg";

const youtube_api = {
  base_url: 'https://www.googleapis.com/youtube/v3',
  api_key: 'AIzaSyDKSQxlLblYrS0Prdd0zWWoEU48Ekm8_JU',
  urlOptions: ['playlistItems', 'videos', 'playlists'],
  paramOptions: {
    playlistItems: {
      part: 'snippet,contentDetails'
    },
    videos: {
      id: vp_domContainer.dataset.featured,
      part: 'statistics,snippet,contentDetails'
    },
    playlists: {
      channelId: vp_domContainer.dataset.channel,
      part: 'snippet'
    }
  }
}

const yt_url = "https://www.youtube.com/embed/";

class JisVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: simplifyYoutubeData(null, null, singleVideo, 'selectedVideo'),
      videoTag: vp_domContainer.dataset.featured,
      channelId: vp_domContainer.dataset.channel,
      featuredPlaylists: JSON.parse(vp_domContainer.dataset.playlist),
      fpLength: JSON.parse(vp_domContainer.dataset.playlist).length,
      playerActive: false,
      playlistsData: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.listPlaylists = this.listPlaylists.bind(this);
    this.getfeaturedVideo = this.getfeaturedVideo.bind(this);
    this.getAllPlaylists = this.getAllPlaylists.bind(this);
    this.filterPlaylists = this.filterPlaylists.bind(this);
  }

  handleClick(e) {
    this.setState({
      playerActive: true
    });
  }

  slideLeft(e) {
    let sp = this.state.scrollPosition;
    console.log(this.state.scrollPosition);
    this.setState({
      scrollPosition: sp - 350
    });
  }

  filterPlaylists(){
    let tempArray = [];

    this.state.featuredPlaylists.map((playlistId) => {
      tempArray = this.state.allPlaylists.map((pl) => {
        if(playlistId === pl.id){
          return pl;
        }
      })
    })

    return tempArray;
  }

  getfeaturedVideo(){
    const singleVideoUrl = `${youtube_api.base_url}/${youtube_api.urlOptions[1]}?key=${youtube_api.api_key}&part=${youtube_api.paramOptions.videos.part}&id=${youtube_api.paramOptions.videos.id}`;

    fetch(singleVideoUrl)
    .then(response => response.json())
    .then((response) => {
      this.setState({
        data: simplifyYoutubeData(null, null, response.items[0], 'selectedVideo')
      })
    })
  }

  getAllPlaylists(){
    const getAllPlaylistsUrl = `${youtube_api.base_url}/${youtube_api.urlOptions[2]}?key=${youtube_api.api_key}&part=${youtube_api.paramOptions.playlists.part}&channelId=${youtube_api.paramOptions.playlists.channelId}`;

    fetch(getAllPlaylistsUrl)
    .then(response => response.json())
    .then((response) => {
      this.setState({
        allPlaylists: simplifyYoutubeData(response.items, null, null, 'playlists')
      }, () => {this.setState({ playlistsData: this.filterPlaylists() })})
    })
  }

  getPlaylists() {
    let featuredList = [];

    const playlistUrl = `${youtube_api.base_url}/${youtube_api.urlOptions[0]}?key=${youtube_api.api_key}&part=${youtube_api.paramOptions.playlistItems.part}&maxResults=20&playlistId=`;

    if(this.state.hasOwnProperty('featuredPlaylists')){
      this.state.featuredPlaylists.map((id)=>{
        fetch(playlistUrl+id)
        .then(response => response.json())
        .then((response) => {
          featuredList.push(response);
        })
        .then(() => {
          if(featuredList.length === this.state.fpLength){
            this.listPlaylists(featuredList)
          }
        })
      });
    }
  }

  listPlaylists(playlist) {
    
    if(playlist.length > 0){
      let pdata = simplifyYoutubeData(playlist, null, null, 'playlists');

      if(doesThisExistAndNotNull(pdata, 'id')){
        return pdata.map((data, i) => {
          return /*#__PURE__*/React.createElement("section", {
              className: "jis-yt-video-playlist-group"
            }, /*#__PURE__*/React.createElement("h2", null, this.state.playlistsData[i].title), /*#__PURE__*/React.createElement("nav", {
              className: "jis-yt-nav-btns"
            }, /*#__PURE__*/React.createElement("button", {
              onClick: this.slideLeft,
              className: "jis-yt-nav-btn ji-yt-slide-left"
            }, "\xAB"), /*#__PURE__*/React.createElement("button", {
              onClick: this.slideRight,
              className: "jis-yt-nav-btn ji-yt-slide-right"
            }, "\xBB")), /*#__PURE__*/React.createElement("div", {
              className: "clip-mask"
            }, /*#__PURE__*/React.createElement("div", {
              style: {
                transform: `translateX(${data.scrollPosition})`
              },
              className: "jis-yt-video-playlist-group-wrapper"
            }, JisSinglePlaylist(data, this.handleClickCallBack))));
        })
      }
    }
  }

  slideRight(e) {
    console.log(e);
  }

  handleClickCallBack(){
    // handle click on thumbnail
  }

  componentDidMount() {
    this.getfeaturedVideo();
    this.getPlaylists();
    this.getAllPlaylists();

   const yt_player = document.querySelector('#jis-iframe-yt-player');

    if(!yt_player){
    let vi = setInterval(() =>{
      let el = document.querySelector('#jis-iframe-yt-player');
      if(el && this.state.playerActive){
        el.height = el.width * 0.609375;
        window.addEventListener('resize', ()=>{
          el.height = el.width * 0.609375;
        });
        this.setState({ytPlayer: el});
        clearInterval(vi);
      }
      
    }, 3000);
    } else {
      this.setState({
        ytPlayer: yt_player
      });
      window.addEventListener('resize', ()=>{
        this.state.ytPlayer.height = this.state.ytPlayer.width * 0.609375;
      });
    }
   
  }


  render() {

    return /*#__PURE__*/ React.createElement("div", {
        className: "jis-video-app"
      }, /*#__PURE__*/React.createElement("div", {
        className: "featured-video"
      }, !this.state.playerActive &&
      /*#__PURE__*/
      //if the the video player is active show this:
      React.createElement("figure", {
        style: {
          backgroundImage: `url(${this.state.data.thumbnailLarge ? this.state.data.thumbnailLarge : jm_default})`
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: this.state.data.thumbnailLarge,
        alt: ""
      }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("div", {
        className: "video-feature-overlay"
      }, /*#__PURE__*/React.createElement("span", {
        className: "video-meta-label"
      }, /*#__PURE__*/React.createElement("b", null, "Jamaica Magazine"), " |", /*#__PURE__*/React.createElement("span", { //change string to variable
        className: "video-title"
      }, " ", this.state.data.title)), /*#__PURE__*/React.createElement("div", {
        className: "btn-wrapper"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick,
        className: "jis-play-icon"
      }, /*#__PURE__*/React.createElement("span", null, "Watch"), /*#__PURE__*/React.createElement("svg", {
        className: "jis-play-icon-svg",
        version: "1.1",
        id: "play-icon",
        x: "0px",
        y: "0px",
        viewBox: "0 0 50 50"
      }, /*#__PURE__*/React.createElement("circle", {
        className: "ring",
        cx: "25.29",
        cy: "25.04",
        r: "24.02"
      }), /*#__PURE__*/React.createElement("polygon", {
        className: "triangle",
        points: "35.64,25.04 17.78,14.73 17.78,35.35 "
      }))))))), this.state.playerActive && /*#__PURE__*/React.createElement("iframe", {
        width: "1200",
        height: "731",
        src: yt_url + this.state.videoTag + "?enablejsapi=1&autoplay=1",
        title: "YouTube video player",
        frameBorder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        modestbranding: "1",
        rel: "0",
        id: "jis-iframe-yt-player"
      })), /*#__PURE__*/React.createElement("div", {
        className: "jis-video-playlists"
      }, this.getPlaylists()));
    
  }
}

const vp_root = ReactDOM.createRoot(vp_domContainer);
vp_root.render(vp(JisVideo));

function JisSinglePlaylist(playlist, handleClickCallBack) {
  return playlist.map((data) => {
    return /*#__PURE__*/ React.createElement("div", {
          key: data.id,
          className: `jis-yt-playlist-thumb${ doesThisExistAndNotNull(data, "thumbnailMedium") ? '' : ' jis-hide-remove-display'}`,
          style: {
            backgroundImage: `url(${data.thumbnailMedium})`
          },
          onClick: handleClickCallBack
        }, /*#__PURE__*/React.createElement("div", {
          className: "jis-yt-video-details"
        }, /*#__PURE__*/React.createElement("span", null, data.title)), /*#__PURE__*/React.createElement("img", {
          src: data.thumbnailMedium,
          alt: data.title
        }));
    });
}


const singleVideo = {
      kind: "youtube#video",
      etag: "ZYKpAr3GsySQTO539gkNwly5fA0",
      id: "o9sY5t4A-UY",
      snippet: {
        publishedAt: "2022-05-02T20:19:47Z",
        channelId: "UCT6cAZGuOgJlXrEoPv8jtEw",
        title: "Jamaica Magazine 02/05/2022",
        description: "#JIS #JISTV #JISnews #Jamaica #Goverment",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/o9sY5t4A-UY/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/o9sY5t4A-UY/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/o9sY5t4A-UY/hqdefault.jpg",
            width: 480,
            height: 360
          },
          standard: {
            url: "https://i.ytimg.com/vi/o9sY5t4A-UY/sddefault.jpg",
            width: 640,
            height: 480
          },
          maxres: {
            url: "https://i.ytimg.com/vi/o9sY5t4A-UY/maxresdefault.jpg",
            width: 1280,
            height: 720
          }
        },
        channelTitle: "Jamaica Information Service",
        tags: ["JIS News", "News", "Jamaica Information Service"],
        categoryId: "25",
        liveBroadcastContent: "none",
        localized: {
          title: "Jamaica Magazine 02/05/2022",
          description: "#JIS #JISTV #JISnews #Jamaica #Goverment"
        },
        defaultAudioLanguage: "en"
      },
      contentDetails: {
        duration: "PT28M2S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular"
      },
      statistics: {
        viewCount: "798",
        likeCount: "22",
        favoriteCount: "0",
        commentCount: "0"
      }
    };

function simplifyYoutubeData(pl, sp, sv, dataType) {

  let playlists, selectedPlaylist, selectedVideo = {};



  if((dataType && dataType === 'playlists' && pl) || pl){
    
    playlists = pl.map((data) => {
      return {id: data.id, title: data.snippet.title};
    });
  }

  if((dataType && dataType === 'selectedPlaylist' && sp) || sp){
    selectedPlaylist = sp.items.map((data) => {
      return {
        id: data.id,
        title: data.snippet.title,
        description: data.snippet.description,
        thumbnailMedium: data.snippet.thumbnails.hasOwnProperty("medium")
          ? data.snippet.thumbnails.medium.url
          : "",
        thumbnailLarge: data.snippet.thumbnails.hasOwnProperty("maxres")
          ? data.snippet.thumbnails.maxres.url
          : "",
        video: data.snippet.resourceId.videoId,
        scrollPosition: 0
      };
    });
  }


  if((dataType && dataType === 'selectedVideo' && sv) || sv){
    selectedVideo = {
      id: sv.id,
      title: sv.snippet.title,
      description: sv.snippet.description,
      thumbnailMedium: sv.snippet.thumbnails.hasOwnProperty("medium")
        ? sv.snippet.thumbnails.medium.url
        : "",
      thumbnailLarge: sv.snippet.thumbnails.hasOwnProperty("maxres")
        ? sv.snippet.thumbnails.maxres.url
        : "",
      duration: sv.contentDetails.duration,
      viewCount: sv.statistics.viewCount,
      likeCount: sv.statistics.likeCount
    };
  }

  if(dataType){
    switch(dataType){
      case 'playlists':
        return playlists;
        break;
      case 'selectedPlaylist':
        return selectedPlaylist;
        break;
      case 'selectedVideo':
        return selectedVideo;
        break;
      default: {}
    }

  } else {
    return {
      playlists,
      selectedPlaylist,
      selectedVideo
    };
  } 
}


function doesThisExistAndNotNull(object, child){
  if(object !== null && object !== 'undefuned' && object.hasOwnProperty(child)){
    if(object[child] !== null && typeof object[child] !== 'undefined' && object[child] !== ''){
      return true;
    }else{
      return false;
    }
  }
}

// https://developers.google.com/youtube/iframe_api_reference 
// extend with ^