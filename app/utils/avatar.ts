export function getAvatarUrl(url?: string): string {
  if (!url) {
    return "/images/default-avatar.png";
  }

  return url;
}

export function getRandomAvatar(): string {
  return `/images/avatars/avatar-${Math.floor(Math.random() * 10) + 1}.png`;
}
