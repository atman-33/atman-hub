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
    title: 'MangaLog',
    icon: 'https://github.com/atman-33/manga-log/blob/main/public/favicons/favicon-32x32.png?raw=true',
    description: 'Track & Organize Your Manga Reading Journey',
    imageUrl:
      'https://raw.githubusercontent.com/atman-33/manga-log/refs/heads/main/public/ogp-image.png',
    demoUrl: 'https://mangalogs.com/',
    tags: ['Manga', 'Tracker', 'Reading Log'],
  },
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
