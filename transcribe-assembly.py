import assemblyai as aai
import os
from dotenv import load_dotenv

load_dotenv()

aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')

transcriber = aai.Transcriber()

config = aai.TranscriptionConfig(speaker_labels=True)

transcript = transcriber.transcribe("./opus-files/John Mayer Has a Sing-Off While Eating Spicy Wings ｜ Hot Ones [1Q9sv9OkQBk].opus", config=config)

if transcript.error:
   print(transcript.error)
   exit(1)

print(transcript.text)

for utterance in transcript.utterances:
    print(f"Speaker {utterance.speaker}: {utterance.text}")