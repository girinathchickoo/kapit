import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";

const Slider = Mui.styled(Mui.Slider)({
  width: "90%",
  margin: "3px 10px",
  padding: "0px !important",
});

export const AudioPlayer = ({ audioFile, player, startingEpisode }: Props) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [startTime, setStartTime] = React.useState(0);
  const [seekerValue, setSeekerValue] = React.useState(0);
  const audioReference = React.useRef<any>();
  const progressBarRef = React.useRef<any>();
  const animations = React.useRef<any>();

  React.useEffect(() => {
    if (startingEpisode && player) toggleButton();
    else startingEpisode && isPlaying && toggleButton();
  }, [player]);

  const toggleButton = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioReference.current.play();
      animations.current = requestAnimationFrame(whilePlaying);
    } else {
      audioReference.current.pause();
      cancelAnimationFrame(animations.current);
    }
  };

  const whilePlaying = () => {
    progressBarRef.current.value = audioReference?.current?.currentTime;
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressBarRef.current.value / duration) * 100}`
    );
    setStartTime(progressBarRef.current.value);
    animations.current = requestAnimationFrame(whilePlaying);
  };

  const calculateTiming = (time: any) => {
    const minutes = Math.floor(time / 60);
    const returnedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const returnedSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMins} : ${returnedSec}`;
  };

  const handleChangeSlider = (value: any) => {
    if (value !== "") {
      setSeekerValue(value);
      audioReference.current.currentTime = value;
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${(value / duration) * 100}`
      );
      setStartTime(value);
    }
  };

  const backward = () => {
    handleChangeSlider(seekerValue <= 30 ? 0 : seekerValue - 30);
  };

  const forward = () => {
    handleChangeSlider(
      duration >= 31 || Math.floor(duration) <= Math.floor(seekerValue)
        ? seekerValue + 30
        : duration
    );
  };

  React.useLayoutEffect(() => {
    const durationTime = Math.floor(audioReference?.current?.duration);
    progressBarRef.current.max = durationTime;
    setDuration(durationTime ? durationTime : 0);
  }, [
    audioReference?.current?.loadedmetadata,
    audioReference?.current?.readyState,
  ]);

  return (
    <Mui.Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"flex-end"}
      spacing={1}
      sx={{ width: "100%" }}
    >
      <audio ref={audioReference} src={audioFile} />
      <Mui.Button
        onClick={backward}
        startIcon={<MuiIcons.KeyboardDoubleArrowLeft />}
      >
        30
      </Mui.Button>
      <Mui.Typography sx={{ fontSize: "0.8rem" }}>
        {calculateTiming(startTime)}
      </Mui.Typography>
      <Mui.Box sx={{ width: "150px" }}>
        <Slider
          onChange={(_, value) => handleChangeSlider(value as number)}
          value={Math.floor(startTime)}
          step={5}
          min={0}
          max={duration}
          ref={progressBarRef}
        />
      </Mui.Box>
      <Mui.Typography sx={{ fontSize: "0.8rem" }}>
        {duration && !isNaN(duration)
          ? calculateTiming(duration)
          : `00 : ${duration} `}
      </Mui.Typography>
      <Mui.Button
        onClick={forward}
        endIcon={<MuiIcons.KeyboardDoubleArrowRight />}
      >
        30
      </Mui.Button>

      <Mui.Box>
        <Mui.IconButton
          onClick={toggleButton}
          sx={{
            color: (theme) => theme.palette.primary.main,
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
            padding: "0.3rem",
          }}
        >
          {isPlaying ? <MuiIcons.Pause /> : <MuiIcons.PlayArrow />}
        </Mui.IconButton>
      </Mui.Box>
    </Mui.Stack>
  );
};

interface Props {
  isPlay?: boolean;
  startingEpisode: boolean;
  audioFile?: string;
  player?: any;
}
