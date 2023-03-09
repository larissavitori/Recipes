import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { RecipeContext } from '../../context';
import './videoEmbed.css';

function VideoEmbed() {
  const [youtubeId, setYoutubeId] = useState('');
  const { recipeDetail: {
    strYoutube,
  } } = useContext(RecipeContext);

  useEffect(() => {
    if (strYoutube) {
      const videoId = strYoutube.split('=')[1];
      setYoutubeId(videoId);
    }
  }, [strYoutube]);

  const opts = {
    height: 360,
    width: 640,
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = ({ target }) => {
    target.pauseVideo();
  };

  return (
    <div className="video-component">
      <h2 className="details-sub-title">Video</h2>
      <div className="youtube-video">
        <YouTube
          videoId={ youtubeId }
          opts={ opts }
          onReady={ onReady }
        />
      </div>
    </div>
  );
}

export default VideoEmbed;
