// Add to APP STATE
let reels = [
{
  id: 1,
  userId: 4,
  videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  likes: 245,
  comments: 35,
  caption: "Beautiful Barcelona sunset 🌇",
  timestamp: "2023-06-18T09:00:00Z"
},
{
  id: 2,
  userId: 2,
  videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  likes: 189,
  comments: 28,
  caption: "New photography techniques 📸",
  timestamp: "2023-06-17T14:30:00Z"
}];

// Add to EVENT LISTENERS
document.querySelectorAll('.tabbar-item').forEach(tab => {
  tab.addEventListener('click', function() {
    if (this.dataset.tab === 'reels') {
      showReels();
    }
  });
});

// Add to setupEventListeners()
document.querySelector('.reel-video').addEventListener('click', toggleVideoPlay);
document.querySelectorAll('.reel-action.like').forEach(btn => {
  btn.addEventListener('click', handleReelLike);
});

// Add new functions
function showReels() {
  hideAllPages();
  reelsContainer.style.display = 'block';
  navbarTitle.textContent = 'Reels';
  loadReel(0);
}

function loadReel(index) {
  const reel = reels[index];
  const video = document.querySelector('.reel-video');
  const user = users.find(u => u.id === reel.userId);
  
  video.src = reel.videoUrl;
  document.querySelector('.reel-user-avatar').src = user.avatar;
  document.querySelector('.reel-username').textContent = user.handle;
  document.querySelector('.reel-likes').textContent = reel.likes;
  document.querySelector('.reel-comments').textContent = reel.comments;
  
  // Update follow button
  const followBtn = document.querySelector('.reel-follow');
  if (currentUser?.followingUsers.includes(reel.userId)) {
    followBtn.textContent = 'Following';
    followBtn.classList.add('following');
  } else {
    followBtn.textContent = 'Follow';
    followBtn.classList.remove('following');
  }
}

function toggleVideoPlay() {
  const video = document.querySelector('.reel-video');
  video.paused ? video.play() : video.pause();
}

function handleReelLike() {
  const reel = reels[currentReelIndex];
  const likeBtn = this.querySelector('i');
  
  if (likeBtn.classList.contains('far')) {
    reel.likes++;
    likeBtn.classList.remove('far');
    likeBtn.classList.add('fas');
    likeBtn.style.color =
    var (--ios - red);
  } else {
    reel.likes--;
    likeBtn.classList.remove('fas');
    likeBtn.classList.add('far');
    likeBtn.style.color = 'white';
  }
  document.querySelector('.reel-likes').textContent = reel.likes;
}

// Modify compose modal to include reel upload
// Add this to compose modal HTML
<div class="compose-type-toggle">
    <button class="btn btn-outline active" data-type="post">Post</button>
    <button class="btn btn-outline" data-type="reel">Reel</button>
</div>

// Add to JavaScript
document.querySelectorAll('.compose-type-toggle button').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.compose-type-toggle button').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    if (this.dataset.type === 'reel') {
      document.getElementById('post-text').placeholder = "Add a caption...";
      mediaUpload.accept = "video/*";
    } else {
      document.getElementById('post-text').placeholder = "What's happening?";
      mediaUpload.accept = "image/*,video/*";
    }
  });
});