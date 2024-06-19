document.addEventListener('visibilitychange', async () => {
    const video = document.querySelector('video');
    const title = document.title.toLowerCase();
    const channelName = await getChannelName();
  
    if (video) {
      if (document.hidden && !isMusicContent(title, channelName)) {
        video.pause();
      } else if (!document.hidden && !isMusicContent(title, channelName)) {
        video.play();
      }
    }
  });
  
  function isMusicContent(title, channelName) {
    return title.includes('song') || title.includes('music') || title.includes('podcast') ||
           channelName.includes('song') || channelName.includes('music') || channelName.includes('podcast');
  }
  
  async function getChannelName() {
    try {
      // Select the channel name element. This might change if YouTube updates their layout.
      const channelElement = document.querySelector('ytd-channel-name a');
      if (channelElement) {
        return channelElement.textContent.toLowerCase();
      }
    } catch (error) {
      console.error('Error fetching channel name:', error);
    }
    return '';
  }
  