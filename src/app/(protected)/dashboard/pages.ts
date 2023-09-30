import Icon from "../../../../public/svg/upload-cloud.svg"

class Page {
  constructor(
    public route: string,
    public title: string,
    public iconUrl: string
  ) {}
}

export const pageGroups = [
  [new Page("/dashboard/explore", "Discover/Explore", Icon)],
  [
    new Page("/dashboard/campaigns", "My Campaigns", Icon),
    new Page("/dashboard/donations", "My Donations", Icon),
    new Page("/dashboard/manage-webpage", "Manage Website Page", Icon),
  ],
  [
    new Page("/dashboard/inbox", "Inbox", Icon),
    new Page("/dashboard/notifications", "Notifications", Icon),
    new Page("/dashboard/settings", "Settings", Icon),
  ],
];