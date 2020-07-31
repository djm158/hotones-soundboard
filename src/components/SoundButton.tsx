import * as React from "react";
import useSound from "use-sound";

import styled from "styled-components";

interface SoundButtonProps {
  sound: string;
  keycode?: number;
}

export const SoundButton = (props: SoundButtonProps) => {
  const [play, { isPlaying, stop }] = useSound(props.sound);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isPlaying) {
      stop();
      play();
    } else {
      play();
    }
  };
  return <StyledSoundButton onClick={handleClick}>hello world</StyledSoundButton>;
};

export const useKeyboardBindings = (map: { [key: number]: () => void }) => {
  React.useEffect(() => {
    const handlePress = (ev: KeyboardEvent) => map[parseInt(ev.key)]();

    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, [map]);
};

const StyledSoundButton = styled.button`
  width: 100px;
  height: 60px;
  border-radius: 10px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease-in-out;
  &:hover, &:focus {
    transform: scale(1.02);
    outline: none;
  }
`