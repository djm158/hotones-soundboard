# hotones-soundboard

soundboard from [the show with hot questions and even hotter wings](https://www.youtube.com/playlist?list=PLAzrgbu8gEMIIK3r4Se1dOZWSZzUSadfZ)

inspired by [@wesbos](https://github.com/wesbos)'s Javascript Drum Kit from his course [Javascript30](https://javascript30.com/) as well as [Andre Madarang](https://twitter.com/drehimself)'s dope [syntax.fm](https://syntax.fm/) [soundboard](https://codepen.io/drehimself/full/BYBwBp/)

https://djm158.github.io/hotones-soundboard

## Development

Just open the `index.html` file in your browser. No need to install anything.

## Key Bindings

You can change the key bindings by right clicking on the key box and selecting a new key.

## Python Scripts

I'm working on a python script to transcribe the audio from the show and save it to a text file. I'm currently using AssemblyAI's API to transcribe the audio. In the future, I'd like to use the transcriptions to generate funny sound effects for the soundboard.

I'm using [pytubefix](https://github.com/JuanBindez/pytubefix) to download the audio from the show.

```bash
pip install pytubefix
```

```bash
python download_hotones.py
```

This will download the audio from the show and save it to the `audio` folder.

To transcribe the audio, you'll need to install the AssemblyAI API and set up an API key.

```bash
pip install assemblyai
```

Then, you can transcribe the audio by running the following command.

```bash
python transcribe-assembly.py
```

This will transcribe the audio and save the transcripts to the `transcripts` folder.
