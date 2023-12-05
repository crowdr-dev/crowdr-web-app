import heart from "../../../../public/svg/heart.svg"
import megaphone from "../../../../public/svg/megaphone.svg"
import dollar from "../../../../public/svg/dollar.svg"
import globe from "../../../../public/svg/globe.svg"
import envelope from "../../../../public/svg/envelope.svg"
import bell from "../../../../public/svg/bell.svg"
import settings from "../../../../public/svg/settings.svg"

class Page {
  constructor(
    public page: { route: string } | { modalId: string },
    public title: string,
    public icon: string,
    public label?: string
  ) {}
}

export const pageGroups = [
  [new Page({ route: "/explore" }, "Discover/Explore", heart)],
  [
    new Page({ route: "/campaigns" }, "My Campaigns", megaphone),
    new Page({ route: "/donations" }, "My Donations", dollar),
    new Page({ route: "" }, "Manage Website Page", globe, "COMING SOON"),
  ],
  [
    new Page({ route: "" }, "Inbox", envelope, "COMING SOON"),
    new Page({ modalId: "notifications" }, "Notifications", bell),
    new Page({ route: "/settings/profile" }, "Settings", settings),
  ],
]
