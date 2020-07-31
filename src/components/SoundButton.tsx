import * as React from "react";
import useSound from "use-sound";

import styled from "styled-components";

interface SoundButtonProps {
  sound: string;
  text: string;
  keyCode: number;
}

export const SoundButton = (props: SoundButtonProps) => {
  const { keyCode, sound, text } = props;
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [play] = useSound(sound, { interrupt: true });
  const keyPressHandler = () => {
    play();
    console.log(btnRef.current)
    btnRef.current?.click();
    btnRef.current?.focus();
    btnRef.current?.blur();
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    play();
  useKeyboardBindings({ 52: keyPressHandler });

  return (
    <StyledSoundButton ref={btnRef} onClick={handleClick}>
      <KeyCodeBox>
        {keyCode !== undefined && keyCode !== null ? keyCode : " "}
      </KeyCodeBox>
      <KeyCodeText>{text}</KeyCodeText>
    </StyledSoundButton>
  );
};

export const useKeyboardBindings = (map: { [key: number]: () => void }) => {
  React.useEffect(() => {
    const handlePress = (ev: KeyboardEvent) => {
      const handler = map[ev.keyCode];
      if (handler) {
        handler();
      }
    };

    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, [map]);
};

const KeyCodeText = styled.p`
  margin: 0;
  padding: 0;

  margin-left: 8px;
`;
const KeyCodeBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 40px;
  width: 40px;
  font-size: 18px;
  border: 1px solid #222;
  text-align: center;
  padding: 5px;
  background: #fb4f4f;
  border-radius: 5px;
  color: #fdfdfd;
`;

const StyledSoundButton = styled.button`
  text-transform: capitalize;
  font-size: 18px;
  border: 1px solid #222;
  transition: all 0.15s ease;
  border-radius: 8px;
  cursor: pointer;
  padding: 2px;
  font-weight: bold;
  width: 180px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active,
  &:focus {
    transform: scale(1.02);
    background: #4ffb80;
    outline: none;
  }

`;
