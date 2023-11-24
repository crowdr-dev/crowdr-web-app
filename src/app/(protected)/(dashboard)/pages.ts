import heart from "../../../../public/svg/heart.svg"
import megaphone from "../../../../public/svg/megaphone.svg"
import dollar from "../../../../public/svg/dollar.svg"
import globe from "../../../../public/svg/globe.svg"
import envelope from "../../../../public/svg/envelope.svg"
import bell from "../../../../public/svg/bell.svg"
import settings from "../../../../public/svg/settings.svg"

class Page {
  constructor(
    public route: string,
    public title: string,
    public icon: string,
    public label?: string,
  ) {}
}

export const pageGroups = [
  [new Page("/explore", "Discover/Explore", heart)],
  [
    new Page("/campaigns", "My Campaigns", megaphone),
    new Page("/donations", "My Donations", dollar),
    new Page("", "Manage Website Page", globe, "Coming Soon"),
  ],
  [
    new Page("", "Inbox", envelope, "Coming Soon"),
    new Page("/notifications", "Notifications", bell),
    new Page("/settings/profile", "Settings", settings),
  ],
];