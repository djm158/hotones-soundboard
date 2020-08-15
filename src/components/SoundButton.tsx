import React, { useState } from "react";
import useSound from "use-sound";

import styled from "styled-components";

interface SoundButtonProps {
  sound: string;
  text: string;
  keyCode: Key;
}

export const SoundButton = (props: SoundButtonProps) => {
  const { keyCode, sound, text } = props;
  const [play] = useSound(sound, { interrupt: true });
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    play();
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 150);
  };
  const keyPressHandler = () => toggleActive();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    toggleActive();
  useKeyboardBindings({ [keyCode]: keyPressHandler });

  return (
    <StyledSoundButton active={active} onClick={handleClick}>
      <KeyCodeBox>
        {keyboardMap[keyCode]}
      </KeyCodeBox>
      <KeyCodeText>{text}</KeyCodeText>
    </StyledSoundButton>
  );
};

type MappedKey = Partial<Record<Key, () => void>>;

export const useKeyboardBindings = (map: MappedKey) => {
  React.useEffect(() => {
    const handlePress = (ev: KeyboardEvent) => {
      console.log(ev.keyCode);
      const handler = map[ev.keyCode as Key];
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

interface StyledSoundButtonProps {
  active: boolean;
}

const StyledSoundButton = styled.button<StyledSoundButtonProps>`
  text-transform: capitalize;
  font-size: 18px;
  border: 1px solid #222;
  transition: all 0.15s ease;
  border-radius: 8px;
  cursor: pointer;
  padding: 2px;
  font-weight: bold;
  width: 180px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.active ? "#4FFB80" : "#E1E2E1")};
  transform: ${(props) => (props.active ? `scale(1.1)` : null)};
`;

export enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  PauseBreak = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,

  LeftArrow = 37,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40,

  Insert = 45,
  Delete = 46,

  Zero = 48,
  ClosedParen = Zero,
  One = 49,
  ExclamationMark = One,
  Two = 50,
  AtSign = Two,
  Three = 51,
  PoundSign = Three,
  Hash = PoundSign,
  Four = 52,
  DollarSign = Four,
  Five = 53,
  PercentSign = Five,
  Six = 54,
  Caret = Six,
  Hat = Caret,
  Seven = 55,
  Ampersand = Seven,
  Eight = 56,
  Star = Eight,
  Asterik = Star,
  Nine = 57,
  OpenParen = Nine,

  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,

  LeftWindowKey = 91,
  RightWindowKey = 92,
  SelectKey = 93,

  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,

  Multiply = 106,
  Add = 107,
  Subtract = 109,
  DecimalPoint = 110,
  Divide = 111,

  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,

  NumLock = 144,
  ScrollLock = 145,

  SemiColon = 186,
  Equals = 187,
  Comma = 188,
  Dash = 189,
  Period = 190,
  UnderScore = Dash,
  PlusSign = Equals,
  ForwardSlash = 191,
  Tilde = 192,
  GraveAccent = Tilde,

  OpenBracket = 219,
  BackSlash = 220,
  ClosedBracket = 221,
  Quote = 222
}

const keyboardMap = [
  "", // [0]
  "", // [1]
  "", // [2]
  "CANCEL", // [3]
  "", // [4]
  "", // [5]
  "HELP", // [6]
  "", // [7]
  "BACK SPACE", // [8]
  "TAB", // [9]
  "", // [10]
  "", // [11]
  "CLEAR", // [12]
  "ENTER", // [13]
  "ENTER_SPECIAL", // [14]
  "", // [15]
  "SHIFT", // [16]
  "CONTROL", // [17]
  "ALT", // [18]
  "PAUSE", // [19]
  "CAPS_LOCK", // [20]
  "KANA", // [21]
  "EISU", // [22]
  "JUNJA", // [23]
  "FINAL", // [24]
  "HANJA", // [25]
  "", // [26]
  "ESCAPE", // [27]
  "CONVERT", // [28]
  "NONCONVERT", // [29]
  "ACCEPT", // [30]
  "MODECHANGE", // [31]
  "SPACE", // [32]
  "PAGE_UP", // [33]
  "PAGE_DOWN", // [34]
  "END", // [35]
  "HOME", // [36]
  "LEFT", // [37]
  "UP", // [38]
  "RIGHT", // [39]
  "DOWN", // [40]
  "SELECT", // [41]
  "PRINT", // [42]
  "EXECUTE", // [43]
  "PRINTSCREEN", // [44]
  "INSERT", // [45]
  "DELETE", // [46]
  "", // [47]
  "0", // [48]
  "1", // [49]
  "2", // [50]
  "3", // [51]
  "4", // [52]
  "5", // [53]
  "6", // [54]
  "7", // [55]
  "8", // [56]
  "9", // [57]
  ":", // [58]
  ";", // [59]
  "<", // [60]
  "=", // [61]
  ">", // [62]
  "?", // [63]
  "AT", // [64]
  "A", // [65]
  "B", // [66]
  "C", // [67]
  "D", // [68]
  "E", // [69]
  "F", // [70]
  "G", // [71]
  "H", // [72]
  "I", // [73]
  "J", // [74]
  "K", // [75]
  "L", // [76]
  "M", // [77]
  "N", // [78]
  "O", // [79]
  "P", // [80]
  "Q", // [81]
  "R", // [82]
  "S", // [83]
  "T", // [84]
  "U", // [85]
  "V", // [86]
  "W", // [87]
  "X", // [88]
  "Y", // [89]
  "Z", // [90]
  "OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
  "", // [92]
  "CONTEXT_MENU", // [93]
  "", // [94]
  "SLEEP", // [95]
  "N0", // [96]
  "N1", // [97]
  "N2", // [98]
  "N3", // [99]
  "N4", // [100]
  "N5", // [101]
  "N6", // [102]
  "N7", // [103]
  "N8", // [104]
  "N9", // [105]
  "MULTIPLY", // [106]
  "ADD", // [107]
  "SEPARATOR", // [108]
  "SUBTRACT", // [109]
  "DECIMAL", // [110]
  "DIVIDE", // [111]
  "F1", // [112]
  "F2", // [113]
  "F3", // [114]
  "F4", // [115]
  "F5", // [116]
  "F6", // [117]
  "F7", // [118]
  "F8", // [119]
  "F9", // [120]
  "F10", // [121]
  "F11", // [122]
  "F12", // [123]
  "F13", // [124]
  "F14", // [125]
  "F15", // [126]
  "F16", // [127]
  "F17", // [128]
  "F18", // [129]
  "F19", // [130]
  "F20", // [131]
  "F21", // [132]
  "F22", // [133]
  "F23", // [134]
  "F24", // [135]
  "", // [136]
  "", // [137]
  "", // [138]
  "", // [139]
  "", // [140]
  "", // [141]
  "", // [142]
  "", // [143]
  "NUM_LOCK", // [144]
  "SCROLL_LOCK", // [145]
  "WIN_OEM_FJ_JISHO", // [146]
  "WIN_OEM_FJ_MASSHOU", // [147]
  "WIN_OEM_FJ_TOUROKU", // [148]
  "WIN_OEM_FJ_LOYA", // [149]
  "WIN_OEM_FJ_ROYA", // [150]
  "", // [151]
  "", // [152]
  "", // [153]
  "", // [154]
  "", // [155]
  "", // [156]
  "", // [157]
  "", // [158]
  "", // [159]
  "CIRCUMFLEX", // [160]
  "EXCLAMATION", // [161]
  "DOUBLE_QUOTE", // [162]
  "HASH", // [163]
  "DOLLAR", // [164]
  "PERCENT", // [165]
  "AMPERSAND", // [166]
  "UNDERSCORE", // [167]
  "OPEN_PAREN", // [168]
  "CLOSE_PAREN", // [169]
  "ASTERISK", // [170]
  "PLUS", // [171]
  "PIPE", // [172]
  "HYPHEN_MINUS", // [173]
  "OPEN_CURLY_BRACKET", // [174]
  "CLOSE_CURLY_BRACKET", // [175]
  "TILDE", // [176]
  "", // [177]
  "", // [178]
  "", // [179]
  "", // [180]
  "VOLUME_MUTE", // [181]
  "VOLUME_DOWN", // [182]
  "VOLUME_UP", // [183]
  "", // [184]
  "", // [185]
  "SEMICOLON", // [186]
  "EQUALS", // [187]
  "COMMA", // [188]
  "MINUS", // [189]
  "PERIOD", // [190]
  "SLASH", // [191]
  "`", // [192]
  "", // [193]
  "", // [194]
  "", // [195]
  "", // [196]
  "", // [197]
  "", // [198]
  "", // [199]
  "", // [200]
  "", // [201]
  "", // [202]
  "", // [203]
  "", // [204]
  "", // [205]
  "", // [206]
  "", // [207]
  "", // [208]
  "", // [209]
  "", // [210]
  "", // [211]
  "", // [212]
  "", // [213]
  "", // [214]
  "", // [215]
  "", // [216]
  "", // [217]
  "", // [218]
  "[", // [219]
  "\\", // [220]
  "]", // [221]
  "QUOTE", // [222]
  "", // [223]
  "META", // [224]
  "ALTGR", // [225]
  "", // [226]
  "WIN_ICO_HELP", // [227]
  "WIN_ICO_00", // [228]
  "", // [229]
  "WIN_ICO_CLEAR", // [230]
  "", // [231]
  "", // [232]
  "WIN_OEM_RESET", // [233]
  "WIN_OEM_JUMP", // [234]
  "WIN_OEM_PA1", // [235]
  "WIN_OEM_PA2", // [236]
  "WIN_OEM_PA3", // [237]
  "WIN_OEM_WSCTRL", // [238]
  "WIN_OEM_CUSEL", // [239]
  "WIN_OEM_ATTN", // [240]
  "WIN_OEM_FINISH", // [241]
  "WIN_OEM_COPY", // [242]
  "WIN_OEM_AUTO", // [243]
  "WIN_OEM_ENLW", // [244]
  "WIN_OEM_BACKTAB", // [245]
  "ATTN", // [246]
  "CRSEL", // [247]
  "EXSEL", // [248]
  "EREOF", // [249]
  "PLAY", // [250]
  "ZOOM", // [251]
  "", // [252]
  "PA1", // [253]
  "WIN_OEM_CLEAR", // [254]
  "" // [255]
];