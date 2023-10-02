import Icon from "../../../../public/svg/upload-cloud.svg"

class Page {
  constructor(
    public route: string,
    public title: string,
    public iconUrl: string
  ) {}
}

export const pageGroups = [
  [new Page("/explore", "Discover/Explore", Icon)],
  [
    new Page("/campaigns", "My Campaigns", Icon),
    new Page("/donations", "My Donations", Icon),
    new Page("/manage-webpage", "Manage Website Page", Icon),
  ],
  [
    new Page("/inbox", "Inbox", Icon),
    new Page("/notifications", "Notifications", Icon),
    new Page("/settings", "Settings", Icon),
  ],
];