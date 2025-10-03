import appsJson from '../../contents/apps.json' with { type: 'json' };

export interface AppItem {
  title: string;
  icon?: string; // Change to string for URL
  description: string;
  imageUrl: string;
  appUrl: string;
  tags: string[];
}

const appsData = appsJson as AppItem[];

export const apps = appsData;
