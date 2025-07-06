export interface AppItem {
  title: string;
  icon?: string; // Change to string for URL
  description: string;
  imageUrl: string;
  demoUrl: string;
  tags: string[];
}

export const apps: AppItem[] = [
  {
    title: 'TubeLoopPlayer',
    icon: 'https://raw.githubusercontent.com/atman-33/tube-loop-player/refs/heads/main/public/favicons/favicon-32x32.png',
    description: 'Loop & Playlist Your Favorite YouTube Videos',
    imageUrl:
      'https://raw.githubusercontent.com/atman-33/tube-loop-player/refs/heads/main/public/ogp-image.png',
    demoUrl: 'https://tubeloopplayer.com/',
    tags: ['YouTube', 'Music', 'Video Player'],
  },
  {
    title: 'Infinite Runner',
    icon: '', // Placeholder for icon URL
    description: 'Control a running mouse, dodge obstacles, and grab coins!',
    imageUrl:
      'https://github.com/atman-33/phaser3-webpack-typescript-template/blob/master/img/game.png?raw=true',
    demoUrl: 'https://atman-33.github.io/phaser3-webpack-typescript-template/',
    tags: ['Game', 'Phaser'],
  },
];
