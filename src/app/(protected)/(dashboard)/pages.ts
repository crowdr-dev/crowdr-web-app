// import Icon from "../../../../public/svg/upload-cloud.svg"

import Icon from "./dashboard-components/Icon";

class Page {
  constructor(
    public route: string,
    public title: string,
    public icon: string
  ) {}
}

export const pageGroups = [
  [new Page("/explore", "Discover/Explore", 'Heart_01')],
  [
    new Page("/campaigns", "My Campaigns", 'Heart_01'),
    new Page("/donations", "My Donations", 'Heart_01'),
    new Page("/manage-webpage", "Manage Website Page", 'Heart_01'),
  ],
  [
    new Page("/inbox", "Inbox", 'Heart_01'),
    new Page("/notifications", "Notifications", 'Heart_01'),
    new Page("/settings", "Settings", 'Settings'),
  ],
];