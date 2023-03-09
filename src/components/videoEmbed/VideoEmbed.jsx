import React, { useContext } from 'react';
import { RecipeContext } from '../../context';

import './videoEmbed.css';

function VideoEmbed() {
  const { recipeDetail: {
    strYoutube,
  } } = useContext(RecipeContext);

  return (
    <div className="video-component">
      <h2 className="details-sub-title">Video</h2>
      <video
        controls
        width="320"
        height="240"
        data-testid="video"
        className="youtube-video"
      >
        <source src={ strYoutube } type="" />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </video>
    </div>
  );
}

export default VideoEmbed;
