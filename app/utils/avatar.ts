export function getAvatarUrl(url?: string): string {
  if (!url) {
    return "/images/default-avatar.png";
  }

  return url;
}

export function getRandomAvatar(): string {
  return `/images/avatars/avatar-${Math.floor(Math.random() * 10) + 1}.png`;
}

export function getRandomUsername(): string {
  const animals = [
    "Lion",
    "Tiger",
    "Bear",
    "Eagle",
    "Shark",
    "Dragon",
    "Phoenix",
    "Unicorn",
    "Wolf",
    "Fox",
    "Panda",
    "Dolphin",
    "Elephant",
    "Leopard",
    "Falcon",
    "Rabbit",
    "Deer",
    "Crocodile",
    "Penguin",
    "Koala",
  ];

  return animals[Math.floor(Math.random() * animals.length)] as string;
}
