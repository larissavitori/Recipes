import PropTypes from 'prop-types';
import React from 'react';

function VideoEmbed({ videoSrc }) {
  return (
    <div className="video-component">
      {console.log(videoSrc)}
      <h2 className="details-sub-title">Video</h2>
      <video
        controls
        width="320"
        height="240"
        data-testid="video"
        className="youtube-video"
      >
        <source src={ videoSrc } type="application/x-shockwave-flash" />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </video>
    </div>
  );
}

VideoEmbed.propTypes = {
  videoSrc: PropTypes.string.isRequired,
};

export default VideoEmbed;
