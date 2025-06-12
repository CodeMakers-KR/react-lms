import { useEffect, useRef, useState } from "react";

import styles from "./Video.module.css";

import videoCaption from "../../assets/video/video_captions.svg";
import videoCaptionOff from "../../assets/video/video_captions_off.svg";
import videoPlay from "../../assets/video/video_play.svg";
import videoReplay from "../../assets/video/video_replay.svg";
import videoPause from "../../assets/video/video_pause.svg";
import videoSoundMute from "../../assets/video/video_sound_0.svg";
import videoSoundLow from "../../assets/video/video_sound_1.svg";
import videoSoundMax from "../../assets/video/video_sound_2.svg";
import videoSpeed05 from "../../assets/video/video_speed_0.5.svg";
import videoSpeed1 from "../../assets/video/video_speed_1.svg";
import videoSpeed15 from "../../assets/video/video_speed_1.5.svg";
import videoSpeed2 from "../../assets/video/video_speed_2.svg";
import videoControlBackword10s from "../../assets/video/video_control_backword_10.svg";
import videoControlForward10s from "../../assets/video/video_control_forward_10.svg";
import videoControlPause from "../../assets/video/video_control_pause.svg";
import videoControlPlay from "../../assets/video/video_control_play.svg";
import videoControlReplay from "../../assets/video/video_control_replay.svg";
import videoFullScreen from "../../assets/video/video_fullscreen.svg";
import videoExitFullScreen from "../../assets/video/video_fullscreen_exit.svg";

export const Video = ({
  src,
  title,
  description,
  uploadDate,
  uploadTime,
  tags = [],
  cc,
  width = "70%",
}) => {
  const wrapperRef = useRef();
  const videoRef = useRef();

  const [onReady, setOnReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showHoverControl, setShowHoverControl] = useState(false);
  const [showCC, setShowCC] = useState(true);

  const toggleHoverControlHandler = (event) => {
    const clickedTagName = event.target.tagName.toLowerCase();
    if (clickedTagName !== "video" && clickedTagName !== "div") {
      return;
    }
    if (showHoverControl) {
      setShowHoverControl(false);
      return;
    }
    setShowHoverControl(true);

    // setTimeout(() => {
    //   setShowHoverControl(false);
    // }, 3000);
  };

  const videoPlayHandler = () => {
    if (!started) {
      setStarted(true);
    }
    setPlaying(true);
    setPaused(false);
    videoRef.current.play();
  };

  const videoPauseHandler = () => {
    setPlaying(false);
    setPaused(true);
    videoRef.current.pause();
  };

  const videoReplayHandler = () => {
    videoRef.current.currentTime = 0;
    setEnded(false);
    videoPlayHandler();
    setTimeout(() => {
      setShowHoverControl(false);
    }, 1500);
  };

  const videoEndedHandler = () => {
    setShowHoverControl(true);
    setPlaying(false);
    setPaused(false);
    setEnded(true);
  };

  const videoTimeUpdateHandler = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const videoLoadMetadataHandler = (event) => {
    setDuration(event.target.duration);
    setOnReady(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        ref={wrapperRef}
        className={`${
          fullscreen ? styles.fullscreenWrapper : styles.normalscreenWrapper
        }`}
        style={{ width: fullscreen ? "100%" : width }}
      >
        <video
          src={src}
          ref={videoRef}
          className={fullscreen ? styles.fullscreenVideo : styles.normalVideo}
          onLoadedMetadata={videoLoadMetadataHandler}
          onTimeUpdate={videoTimeUpdateHandler}
          onEnded={videoEndedHandler}
          onClick={toggleHoverControlHandler}
        ></video>

        <Caption cc={cc} showCC={showCC} currentTime={currentTime} />

        <VideoHoverControl
          videoRef={videoRef}
          started={started}
          paused={paused}
          ended={ended}
          playing={playing}
          fullscreen={fullscreen}
          showHoverControl={showHoverControl}
          setCurrentTime={setCurrentTime}
          onClick={toggleHoverControlHandler}
          onPlay={videoPlayHandler}
          onPause={videoPauseHandler}
          onReplay={videoReplayHandler}
        />

        <VideoHandler
          videoRef={videoRef}
          started={started}
          paused={paused}
          ended={ended}
          onReady={onReady}
          playing={playing}
          duration={duration}
          fullscreen={fullscreen}
          currentTime={currentTime}
          cc={cc}
          showCC={showCC}
          setShowCC={setShowCC}
          setFullscreen={setFullscreen}
          setCurrentTime={setCurrentTime}
          onPlay={videoPlayHandler}
          onPause={videoPauseHandler}
          onReplay={videoReplayHandler}
        />
      </div>

      <div className={styles.videoInfo}>
        <h2 className={styles.videoTitle}>{title}</h2>
        <div className={styles.videoDescription}>{description}</div>
        <div className={styles.videoUploadDateTime}>
          Upload: {uploadDate} {uploadTime}
        </div>
        <ul className={styles.tags}>
          {tags.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Caption = ({ cc, showCC, currentTime }) => {
  if (!showCC) {
    return <></>;
  }

  const nowCaption = cc.filter((cc) => {
    return cc.start <= currentTime && cc.end >= currentTime;
  });

  if (nowCaption.length === 0) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "0px",
        right: "0px",
        textAlign: "center",
        bottom: "50px",
        zIndex: 1050,
        marginBottom: "10px",
        fontSize: "1.7rem",
      }}
    >
      {nowCaption.map(({ caption }) => (
        <p key={Math.random()} style={{ margin: "3px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "5px 20px",
              backgroundColor: "#0009",
              color: "#FFF",
            }}
          >
            {caption}
          </span>
        </p>
      ))}
    </div>
  );
};

const VideoHoverControl = ({
  videoRef,
  onClick,
  started,
  ended,
  paused,
  playing,
  fullscreen,
  showHoverControl,
  setCurrentTime,
  onPlay,
  onPause,
  onReplay,
}) => {
  const clickBackwordHandler = () => {
    videoRef.current.currentTime -= 10;
    setCurrentTime(videoRef.current.currentTime);
  };
  const clickForwordHandler = () => {
    videoRef.current.currentTime += 10;
    setCurrentTime(videoRef.current.currentTime);
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${
          fullscreen
            ? styles.fullscreenHoverControl
            : styles.normalscreenHoverControl
        } ${showHoverControl && styles.screenHoverControlHover}`}
    >
      {started && !ended && (
        <img
          src={videoControlBackword10s}
          onClick={clickBackwordHandler}
          style={{ cursor: "pointer" }}
        />
      )}
      {started && playing && (
        <img
          src={videoControlPause}
          onClick={onPause}
          style={{ cursor: "pointer" }}
        />
      )}
      {(!started || paused) && (
        <img
          src={videoControlPlay}
          onClick={onPlay}
          style={{ cursor: "pointer" }}
        />
      )}
      {ended && (
        <img
          src={videoControlReplay}
          onClick={onReplay}
          style={{ cursor: "pointer" }}
        />
      )}
      {started && !ended && (
        <img
          src={videoControlForward10s}
          onClick={clickForwordHandler}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

const VideoHandler = ({
  videoRef,
  started,
  paused,
  ended,
  onReady,
  playing,
  duration,
  fullscreen,
  currentTime,
  cc,
  showCC,
  setShowCC,
  setFullscreen,
  setCurrentTime,
  onPlay,
  onPause,
  onReplay,
}) => {
  const [volumn, setVolumn] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (onReady) {
      setVolumn(videoRef.current.currentTime);
    }
  }, [onReady, setVolumn, videoRef]);

  const seekingHandler = (event) => {
    videoRef.current.currentTime = event.target.value;
    setCurrentTime(event.target.value);
  };

  const videoVolumnChangeHandler = (event) => {
    videoRef.current.volume = event.target.value;
    setVolumn(event.target.value);
  };

  const videoSpeedChangeHandler = (event) => {
    videoRef.current.playbackRate = parseFloat(event.target.value);
    setSpeed(parseFloat(event.target.value));
  };

  const videoExitFullscreenClickHandler = () => {
    document.querySelector("body").style.overflow = "auto";
    setFullscreen(false);
  };

  const videoFullscreenClickHandler = () => {
    document.querySelector("body").style.overflow = "hidden";
    setFullscreen(true);
  };

  return (
    <div
      className={fullscreen ? styles.fullscreenHandler : styles.normalHandler}
    >
      {(!started || paused) && (
        <img
          src={videoPlay}
          disabled={!onReady}
          onClick={onPlay}
          style={{ cursor: "pointer" }}
        />
      )}
      {playing && (
        <img
          src={videoPause}
          disabled={!onReady}
          onClick={onPause}
          style={{ cursor: "pointer" }}
        />
      )}
      {ended && (
        <img
          src={videoReplay}
          disabled={!onReady}
          onClick={onReplay}
          style={{ cursor: "pointer" }}
        />
      )}
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        step={0.000001}
        disabled={!onReady}
        onInput={seekingHandler}
        style={{ flexGrow: 1 }}
      />

      <img
        src={
          volumn == 0
            ? videoSoundMute
            : volumn < 0.5
            ? videoSoundLow
            : videoSoundMax
        }
        disabled={!onReady}
      />
      <input
        type="range"
        min={0}
        max={1}
        value={volumn}
        step={0.1}
        disabled={!onReady}
        onInput={videoVolumnChangeHandler}
        style={{ width: "50px" }}
      />

      <img
        src={
          speed === 0.5
            ? videoSpeed05
            : speed === 1
            ? videoSpeed1
            : speed === 1.5
            ? videoSpeed15
            : videoSpeed2
        }
        disabled={!onReady}
      />
      <input
        type="range"
        min={0.5}
        max={2}
        step={0.5}
        value={speed}
        disabled={!onReady}
        onInput={videoSpeedChangeHandler}
        style={{ width: "50px" }}
      />

      {cc?.length > 0 && !showCC && (
        <img
          title="자막 끔"
          src={videoCaptionOff}
          disabled={!onReady}
          onClick={() => {
            setShowCC(true);
          }}
          style={{ cursor: "pointer" }}
        />
      )}
      {cc?.length > 0 && showCC && (
        <img
          title="자막 켬"
          src={videoCaption}
          disabled={!onReady}
          onClick={() => {
            setShowCC(false);
          }}
          style={{ cursor: "pointer" }}
        />
      )}

      {!fullscreen && (
        <img
          title="전체화면"
          src={videoFullScreen}
          disabled={!onReady}
          onClick={videoFullscreenClickHandler}
          style={{ cursor: "pointer" }}
        />
      )}
      {fullscreen && (
        <img
          title="전체화면 종료"
          src={videoExitFullScreen}
          disabled={!onReady}
          onClick={videoExitFullscreenClickHandler}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};
