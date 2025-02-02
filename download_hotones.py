
from pytubefix import Playlist

playlist_url = "https://www.youtube.com/playlist?list=PLAzrgbu8gEMIIK3r4Se1dOZWSZzUSadfZ"

playlist = Playlist(playlist_url)

for video in playlist.videos:
    ys = video.streams.get_audio_only()
    ys.download(output_path="audio")