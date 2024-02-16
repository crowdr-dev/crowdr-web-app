import Image from "next/image"
import moment, { Moment } from "moment"
import { useSetAtom } from "jotai"
import ModalTrigger from "../../../common/components/ModalTrigger"
import Dot from "./Dot"

import { formatAmount } from "../common/utils/currency"
import { pageDrawerAtom } from "./Sidebar"

import { RFC } from "@/app/common/types"
import { HiMiniXMark } from "react-icons/hi2"

const Notifications = () => {
  const setCurrentDrawerId = useSetAtom(pageDrawerAtom)

  return (
    <div className="flex flex-col bg-white w-[400px] max-h-full pt-6">
      <div className="flex justify-between px-6 mb-6">
        <h1 className="font-semibold text-2xl">Notifications</h1>

        <ModalTrigger id="notifications" type="hide">
          <div onClick={() => setCurrentDrawerId('')} className="relative hover:bg-[#F8F8F8] transition cursor-pointer rounded-full p-2 -top-1">
            <HiMiniXMark fill="#98A2B3" className="h-6 w-6" />
          </div>
        </ModalTrigger>
      </div>

      <div className="grow overflow-y-auto px-6">
        {notifications.map((notification, index) => (
          <Notification key={index} detail={notification} isLastItem={(index + 1) === notifications.length} />
        ))}
      </div>
    </div>
  )
}

export default Notifications

const Notification: RFC<NotificationProps> = ({ detail, isLastItem }) => {
  const {type, timestamp, imageUrl, acccountName, campaign, seen} = detail
  const bottomMargin = !isLastItem ? 'mb-8' : 'mb-8'

  return (
    <div className="flex gap-3 text-sm cursor-pointer">
      {/* account photo */}
      <div className="flex flex-col items-center">
        <div className="h-12 w-12">
          <Image src={imageUrl} width={48} height={48} alt={acccountName} className="object-cover rounded-full h-full w-full" />
        </div>
          {!isLastItem && <div className="grow bg-[#EAECF0] rounded-sm w-[2.5px] my-1"></div>}
      </div>

      <div className="grow">
        {/* name x timestamp */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-[#344054]">{acccountName}</p>
            <p className="text-[#475467] font-light">{moment(timestamp).fromNow()}</p>
            {/* TODO: MAKE TIMESTAMP RESEMBLE THAT IN FIGMA */}
          </div>

          {!seen && <Dot />}
        </div>
        
        {/* volunteer/donate details */}
        {type === 'donation' && <p className={`text-[#1F2227] ${bottomMargin}`}>Donated {formatAmount(detail.amount, detail.currency)} to <span className="text-primary">{campaign}</span> campaign</p>}
        {type === 'volunteer' && <p className={`text-[#475467] ${bottomMargin}`}>Volunteered for the <span className="text-primary">{campaign}</span> campaign</p>}
      </div>
    </div>
  )
}

type NotificationProps = {
  detail: NotificationType
  isLastItem: boolean
}

type NotificationType = IDonationNotification | IVolunteerNotification

interface INotification {
  timestamp: string | Moment
  imageUrl: string,
  acccountName: string
  campaign: string
  seen: boolean
}

interface IVolunteerNotification extends INotification {
  type: "volunteer"
}

interface IDonationNotification extends INotification {
  type: 'donation',
  amount: number
  currency: "naira" | "dollar"
}

const notifications: NotificationType[] = [
  {
    type: "donation",
    timestamp: moment(),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Phoenix Baker",
    campaign: "Help Kunle",
    seen: true,
    amount: 5000,
    currency: "naira",
  },
  {
    type: "volunteer",
    timestamp: moment().subtract(2, 'minutes'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Lana Steiner",
    campaign: "Lagos Food Bank",
    seen: true,
  },
  {
    type: "donation",
    timestamp: moment().subtract(5, 'minutes'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Phoenix Baker",
    campaign: "Help Kunle beat Cancer",
    seen: false,
    amount: 100000,
    currency: "naira",
  },
  {
    type: "volunteer",
    timestamp: moment().subtract(10, 'minutes'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Lana Steiner",
    campaign: "Lagos Food Bank",
    seen: false,
  },
  {
    type: "donation",
    timestamp: moment().subtract(1, 'days'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Phoenix Baker",
    campaign: "Help Kunle beat Cancer",
    seen: true,
    amount: 100000,
    currency: "naira",
  },
  {
    type: "volunteer",
    timestamp: moment().subtract(1, 'weeks'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Lana Steiner",
    campaign: "Lagos Food",
    seen: false,
  },
  {
    type: "volunteer",
    timestamp: moment().subtract(2, 'weeks'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Demi Wikinson",
    campaign: "Lagos Food Bank",
    seen: true,
  },
  {
    type: "donation",
    timestamp: moment().subtract(1, 'months'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Phoenix Baker",
    campaign: "Help Kunle beat Cancer",
    seen: false,
    amount: 100000,
    currency: "naira",
  },
  {
    type: "volunteer",
    timestamp: moment().subtract(3, 'months'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Demi Wikinson",
    campaign: "Lagos Food Bank",
    seen: true,
  },
  {
    type: "donation",
    timestamp: moment().subtract(1, 'years'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Phoenix Baker",
    campaign: "Help Kunle beat Cancer",
    seen: false,
    amount: 100000,
    currency: "naira",
  },
  {
    type: "volunteer",
    timestamp: moment().subtract(2, 'years'),
    imageUrl: 'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg',
    acccountName: "Demi Wikinson",
    campaign: "Lagos Food Bank",
    seen: true,
  },
]
