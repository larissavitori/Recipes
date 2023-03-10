import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { RecipeContext } from '../../context';
import './videoEmbed.css';

function VideoEmbed() {
  const WIDTH_TAX = 0.8;
  const HEIGHT_TAX = 0.5625;
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

  const onReady = ({ target }) => {
    target.pauseVideo();
  };

  const youtubeOpt = {
    height: window.innerWidth * WIDTH_TAX * HEIGHT_TAX,
    width: window.innerWidth * WIDTH_TAX,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="video-component">
      <h2 className="details-sub-title">Video</h2>
      <div data-testid="video" className="youtube-video">
        <YouTube
          videoId={ youtubeId }
          opts={ youtubeOpt }
          onReady={ onReady }
        />
      </div>
    </div>
  );
}

export default VideoEmbed;
