'use strict';

// One player per page???
const rp_domContainer = document.querySelector('#jis-radio-player') || document.querySelector('#jis-radio-player-small');

const rp = React.createElement;
const rp_url = rp_domContainer.dataset.url;

class RadioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: rp_data,
      fullPlayer: true
    }

    this.displayBufferedAmount = this.displayBufferedAmount.bind(this);
    this.whilePlaying = this.whilePlaying.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.handleMuteButton = this.handleMuteButton.bind(this);
    this.handleSmallPlayerPlayButton = this.handleSmallPlayerPlayButton.bind(this);
    this.whileSmallPlayerPlaying = this.whileSmallPlayerPlaying.bind(this);
  }

  componentDidMount() {
    this.choosePlayer(rp_domContainer.dataset);

    fetch(rp_url)
    .then(response => response.json())
    .then((response) => {
      this.setState({
        data: response
      })
    })
    .catch((error) => {
        console.error(error);
    });
  }

  choosePlayer(playerData){
    console.log(playerData);
    if ( doesThisExistAndNotNull(playerData, 'playertype') && playerData['playertype'] === 'small') {
      this.setState({
        fullPlayer: false
      }, this.setSmallPlayerValues)
    } else {
      this.setState({
        fullPlayer: true
      }, this.setFullPlayerValues)
    }
  }

  setFullPlayerValues(){
    this.setState(
      {
        radio: {
          seekSlider: document.getElementById("seek-slider"),
          volumeSlider: document.getElementById("volume-slider"),
          audioPlayerContainer: document.getElementById(
            "audio-player-container"
          ),
          playIcon: document.getElementById("play-icon"),
          muteIcon: document.getElementById("mute-icon"),
          audio: document.querySelector("audio"),
          durationContainer: document.getElementById("duration"),
          playState: "play",
          muteState: "unmute",
          rAF: null
        }
      }, this.executeFullPlayerCallback    
    );
  }

  setSmallPlayerValues(){
    this.setState({
      radio: {
        progress: document.querySelector('#strength-bar'),
        audio: document.querySelector('audio'),
        playState: 'play',
        rAF: null
      }
    }, this.executeSmallPlayerCallback);
  }

  calculateTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  loadSmallPlayer(){
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "progress",
      id: "strength-bar"
    }), /*#__PURE__*/React.createElement("div", {
      className: "player-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: `jis-play-story-icon ${this.state.radio.playState}`,
      onClick: this.handleSmallPlayerPlayButton
    }, /*#__PURE__*/React.createElement("svg", {
      id: "jis-play-btn-svg",
      viewBox: "0 0 48.04 48.04"
    }, /*#__PURE__*/React.createElement("circle", {
      className: "ring",
      cx: "24.02",
      cy: "24.02",
      r: "24.02"
    }), /*#__PURE__*/React.createElement("polygon", {
      className: "triangle",
      points: "34.37 24.02 16.51 13.71 16.51 34.33 34.37 24.02"
    }), /*#__PURE__*/React.createElement("rect", {
      className: "pause",
      x: "14.65",
      y: "13.71",
      width: "5.16",
      height: "20.62"
    }), /*#__PURE__*/React.createElement("rect", {
      className: "pause",
      x: "27.65",
      y: "13.71",
      width: "5.16",
      height: "20.62"
    })))), /*#__PURE__*/React.createElement("span", {
      className: "player-label"
    }, doesThisExistAndNotNull(rp_domContainer.dataset, 'buttonLabel') ? rp_domContainer.dataset.buttonLabel : '') , /*#__PURE__*/React.createElement("audio", {
      preload: "metadata",
      src: this.state.data[0]._jis_radio_file
    }));
  }

  loadLargePlayer(){
    const regex = /style="(.*?)"/gm;
    const jis_content_string = this.state.data[0].content.rendered;
    const subst = ``;
    const placeHoldertext = 'No description available';

    // The substituted value will be contained in the result variable
    const clean_content = jis_content_string.replace(regex, subst);

    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "radio-player-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "thumb-wrapper",
      style: {
        backgroundImage: `url(${this.state.data[0].more_fields.post_img_links[0].small})`
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: this.state.data[0].more_fields.post_img_links[0].small,
      alt: "story thumb"
    })), /*#__PURE__*/React.createElement("div", {
      className: "radio-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "radio-content-description"
    }, /*#__PURE__*/React.createElement("h3", null, this.state.data[0].title.rendered), clean_content.length <= 0 && /*#__PURE__*/React.createElement("div", {
      className: "radio-content-text radio-placeholder"
    }, /*#__PURE__*/React.createElement("p", null, placeHoldertext)), clean_content.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "radio-content-text",
      dangerouslySetInnerHTML: {
        __html: clean_content
      }
    })), /*#__PURE__*/React.createElement("div", {
      id: "audio-player-container",
      className: "custom-radio-player"
    }, /*#__PURE__*/React.createElement("audio", {
      src: this.state.data[0]._jis_radio_file,
      preload: "metadata"
    }), /*#__PURE__*/React.createElement("button", {
      id: "play-icon",
      onClick: this.handlePlayButton
    }), /*#__PURE__*/React.createElement("input", {
      type: "range",
      id: "seek-slider",
      max: "100",
      defaultValue: "0"
    }), /*#__PURE__*/React.createElement("span", {
      id: "duration",
      className: "time"
    }, "0:00"), /*#__PURE__*/React.createElement("button", {
      className: "unmuted",
      id: "mute-icon",
      onClick: this.handleMuteButton
    }), /*#__PURE__*/React.createElement("input", {
      type: "range",
      id: "volume-slider",
      max: "100",
      defaultValue: "0"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "presenter-details"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pd-text"
    }, /*#__PURE__*/React.createElement("span", {
      className: "presenter-label"
    }, "Presented by:"), /*#__PURE__*/React.createElement("span", {
      className: "presenter-name"
    }, this.state.data[0].x_metadata._jis_radio_presenter)), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/avatar.png",
      alt: this.state.data[0].x_metadata._jis_radio_presenter
    }))));
  }

  showRangeProgress(rangeInput) {
    let currValue = this.state.radio;

    if (rangeInput === this.state.radio.seekSlider) {
      currValue.audioPlayerContainer.style.setProperty(
        "--seek-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%"
      );
    } else {
      currValue.audioPlayerContainer.style.setProperty(
        "--volume-before-width",
        (rangeInput.value / rangeInput.max) * 100 + "%"
      );
    }
  }

  displayDuration() {
    this.state.radio.durationContainer.textContent = this.calculateTime(
      this.state.radio.audio.duration
    );
  }

  setSliderMax() {
    this.state.radio.seekSlider.max = Math.floor(
      this.state.radio.audio.duration
    );
  }

  displayBufferedAmount() {
    const bufferedAmount = Math.floor(
      this.state.radio.audio.buffered.end(
        this.state.radio.audio.buffered.length - 1
      )
    );
    this.state.radio.audioPlayerContainer.style.setProperty(
      "--buffered-width",
      `${(bufferedAmount / this.state.radio.seekSlider.max) * 100}%`
    );
  }

  whilePlaying() {
    this.state.radio.seekSlider.value = Math.floor(
      this.state.radio.audio.currentTime
    );
    this.state.radio.durationContainer.textContent = this.calculateTime(
      this.state.radio.seekSlider.value
    );
    this.state.radio.audioPlayerContainer.style.setProperty(
      "--seek-before-width",
      `${
        (this.state.radio.seekSlider.value / this.state.radio.seekSlider.max) *
        100
      }%`
    );
    this.state.radio.raf = requestAnimationFrame(this.whilePlaying);
    
  }

  whileSmallPlayerPlaying(){
        let progress =  this.state.radio.audio.currentTime / this.state.radio.audio.duration;
        
        if(progress < 1){
          this.state.radioPlayerBar.animate(progress, {});
        }

        this.state.radio.raf = requestAnimationFrame(this.whileSmallPlayerPlaying);
  }

  handlePlayButton() {

    if (this.state.radio.playState === "play") {
      this.state.radio.audio.play();
      this.state.radio.playIcon.classList.remove("play");
      this.state.radio.playIcon.classList.add("pause");
      requestAnimationFrame(this.whilePlaying);
      this.state.radio.playState = "pause";
      addEventListener('complete', () =>  cancelAnimationFrame(this.state.radio.raf) );
    } else {
      this.state.radio.audio.pause();
      this.state.radio.playIcon.classList.remove("pause");
      this.state.radio.playIcon.classList.add("play");
      cancelAnimationFrame(this.state.radio.raf);
      this.state.radio.playState = "play";
    }
  }

  handleMuteButton() {
    if (this.state.radio.muteState === "unmute") {
      this.state.radio.audio.muted = true;
      this.state.radio.muteState = "muted";
      this.state.radio.muteIcon.classList.remove("unmuted");
      this.state.radio.muteIcon.classList.add("muted");
    } else {
      this.state.radio.audio.muted = false;
      this.state.radio.muteState = "unmute";
      this.state.radio.muteIcon.classList.remove("muted");
      this.state.radio.muteIcon.classList.add("unmuted");
    }
  }

  handleSmallPlayerPlayButton() {
    if (this.state.radio.playState === "play") {
      this.state.radio.audio.play();
      this.state.radio.playState = "pause";
      requestAnimationFrame(this.whileSmallPlayerPlaying);
      addEventListener('complete', () =>  cancelAnimationFrame(this.state.radio.raf) );
    } else {
      this.state.radio.audio.pause();
      this.state.radio.playState = "play";
      cancelAnimationFrame(this.state.radio.raf);
    }
  }

  executeFullPlayerCallback(){
    this.state.radio.seekSlider.addEventListener("input", (e) => {
      this.showRangeProgress(e.target);
    });
    this.state.radio.volumeSlider.addEventListener("input", (e) => {
      this.showRangeProgress(e.target);
    });

    //Set Duration
    if (this.state.radio.audio.readyState > 0) {
      this.displayDuration();
    } else {
      this.state.radio.audio.addEventListener("loadedmetadata", () => {
        this.displayDuration();
      });
    }

    // Show Buffered Amount & audio
    if (this.state.radio.audio.readyState > 0) {
      this.displayDuration();
      this.setSliderMax();
      this.displayBufferedAmount();
      this.state.radio.volumeSlider.value =
        this.state.radio.audio.volume * 100;
    } else {
      this.state.radio.audio.addEventListener("loadedmetadata", () => {
        this.displayDuration();
        this.setSliderMax();
        this.displayBufferedAmount();
        this.state.radio.volumeSlider.value =
          this.state.radio.audio.volume * 100;
      });
    }

    this.state.radio.audio.addEventListener(
      "progress",
      this.displayBufferedAmount
    );

    // Handle slider changes and set volume
    this.state.radio.seekSlider.addEventListener("change", () => {
      this.state.radio.audio.currentTime = this.state.radio.seekSlider.value;
    });

    this.state.radio.audio.addEventListener("timeupdate", () => {
      this.state.radio.seekSlider.value = Math.floor(
        this.state.radio.audio.currentTime
      );
    });

    this.state.radio.seekSlider.addEventListener("input", () => {
      this.state.radio.durationContainer.textContent = this.calculateTime(
        this.state.radio.seekSlider.value
      );
      if (!this.state.radio.audio.paused) {
        cancelAnimationFrame(this.state.radio.raf);
      }
    });

    this.state.radio.seekSlider.addEventListener("change", () => {
      this.state.radio.audio.currentTime = this.state.radio.seekSlider.value;
      if (!this.state.radio.audio.paused) {
        requestAnimationFrame(this.whilePlaying);
      }
    });

    this.state.radio.volumeSlider.addEventListener("input", (e) => {
      const value = e.target.value;

      this.state.radio.audio.volume = value / 100;
    });

    mediaApi(this.state.data[0], this.state.radio, this.whilePlaying);
  }

  executeSmallPlayerCallback(){
    this.setState({
      progressMax: this.state.radio.audio.duration,
      radioPlayerBar: new ProgressBar.Circle(this.state.radio.progress, {
        color: '#817400',
        trailColor: '#fff383',
        duration: 1000,
        easing: 'easeOut',
        strokeWidth: 5
    })
    })

    mediaApi(this.state.data[0], this.state.radio, this.whileSmallPlayerPlaying, 'small');
  }

  render() {

    return this.state.fullPlayer ? this.loadLargePlayer() : this.loadSmallPlayer();

  }
}

const rp_root = ReactDOM.createRoot(rp_domContainer);
rp_root.render(rp(RadioPlayer));

const mediaApi = function (data, radio, whilePlaying, playerType = 'full') {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.title.rendered,
        artist: data.cmb2._jis_radio_metabox._jis_radio_presenter,
        album: data.show[0],
        artwork: [
          {
            src: data.more_fields.post_img_links[0].small,
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: data.more_fields.post_img_links[0].small,
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: data.more_fields.post_img_links[0].small,
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: data.more_fields.post_img_links[0].small,
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: data.more_fields.post_img_links[0].small,
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: data.more_fields.post_img_links[0].small,
            sizes: "512x512",
            type: "image/png"
          }
        ]
      });
  
      navigator.mediaSession.setActionHandler("play", () => {
        if (radio.playState === "play") {
          radio.audio.play();
          if(playerType === 'full'){
            radio.playIcon.classList.remove("play");
            radio.playIcon.classList.add("pause");
          }
          requestAnimationFrame(whilePlaying);
          radio.playState = "pause";
        } else {
          radio.audio.pause();
          if(playerType === 'full'){
            radio.playIcon.classList.remove("pause");
            radio.playIcon.classList.add("play");
          }
          cancelAnimationFrame(radio.raf);
          radio.playState = "play";
        }
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        if (radio.playState === "play") {
          radio.audio.play();
          if(playerType === 'full'){
            radio.playIcon.classList.remove("play");
            radio.playIcon.classList.add("pause");
          }
          requestAnimationFrame(whilePlaying);
          radio.playState = "pause";
        } else {
          radio.audio.pause();
          if(playerType === 'full'){
            radio.playIcon.classList.remove("pause");
            radio.playIcon.classList.add("play");
          }
          cancelAnimationFrame(radio.raf);
          radio.playState = "play";
        }
      });
      navigator.mediaSession.setActionHandler("seekbackward", (details) => {
        radio.audio.currentTime =
          radio.audio.currentTime - (details.seekOffset || 10);
      });
      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        radio.audio.currentTime =
          radio.audio.currentTime + (details.seekOffset || 10);
      });
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.fastSeek && "fastSeek" in radio.audio) {
          radio.audio.fastSeek(details.seekTime);
          return;
        }
        radio.audio.currentTime = details.seekTime;
      });

      if(playerType === 'full'){
        navigator.mediaSession.setActionHandler("stop", () => {
          radio.audio.currentTime = 0;
          radio.seekSlider.value = 0;
          radio.audioPlayerContainer.style.setProperty("--seek-before-width", "0%");
          radio.durationContainer.textContent = "0:00";
          if (radio.playState === "pause") {
            radio.playIcon.classList.remove("pause");
            radio.playIcon.classList.add("play");
            cancelAnimationFrame(radio.raf);
            radio.playState = "play";
          }
        });
      } else {
        navigator.mediaSession.setActionHandler("stop", () => {
          radio.audio.currentTime = 0;
          if (radio.playState === "pause") {
            cancelAnimationFrame(radio.raf);
            radio.playState = "play";
          }
        });
      }
    }
  };
  

const rp_data = [
    {
       "title": {
            "rendered": "The Arts Page- April 29, 2022"
        },
        "content": {
            "rendered": "<p>The National Pantomime mounts its latest work, but for a limited time only.</p>\n",
            "protected": false
        },
       
        "more_fields": {
            "post_img_links": [
                {
                    "large": "https://jis.gov.jm/media/fly-images/224032/jis-no-photo-640x580-c.jpg",
                    "medium": "https://jis.gov.jm/media/fly-images/224032/jis-no-photo-640x380-c.jpg",
                    "small": "https://jis.gov.jm/media/fly-images/224032/jis-no-photo-280x280-c.jpg"
                }
            ],
            "post_category_name": "Culture",
            "post_category_icon": "fa-users",
            "post_excerpt": "",
            "post_author": "",
            "post_date": "Apr 29, 2022",
            "post_long_date": "Friday, April 29th 2022",
            "post_time": "5 hours ago"
        },
       
        "cmb2": {
            "_jis_radio_metabox": {
                "_jis_radio_file": "https://jis.gov.jm/media/2022/04/The-Arts-Page-20220429-JS.mp3",
                "_jis_radio_video_clip": "",
                "_jis_radio_duration": "4:54",
                "_jis_aired_date": "1651190400",
                "_jis_radio_producer": "Vanessa Silvera",
                "_jis_radio_presenter": "Vanessa Silvera",
                "_jis_story_url": "",
                "_jis_show_type": ""
            }
        },

        "x_metadata": {
          "_jis_radio_presenter": "Vanessa Silvera"
        },

        "show": [
          "Arts Page"
      ]
        
    }
  ];



  function doesThisExistAndNotNull(object, child){
    if(object !== null && object !== 'undefuned' && object.hasOwnProperty(child)){
      if(object[child] !== null && typeof object[child] !== 'undefined' && object[child] !== ''){
        return true;
      }else{
        return false;
      }
    }
  }


//   function onLoad() {
//     var barContainer = document.querySelector('#strength-bar');
//     var radioPlayerBar = new ProgressBar.Circle(barContainer, {
//         color: '#817400',
//         trailColor: '#fff383',
//         duration: 1000,
//         easing: 'easeOut',
//         strokeWidth: 5
//     });
    
//     radioPlayerBar.animate(0.9, {});
// }

// window.onload = onLoad;
