import {
  Children,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import { RFC } from "@/app/common/types"

const Tabs: Tabs = ({ children, activeTab: initialTab }) => {
  const tabs = Children.map(children, (child) => child)
  const tabHeadings = tabs.map((tabElement) => tabElement.props.heading)
  const [activeTab, setActiveTab] = useState(
    initialTab ? initialTab : tabHeadings[0]
  )

  return (
    <div>
      <div className="flex gap-4 border-b boder-[#E4E7EC] mb-8">
        {tabHeadings.map((heading) => (
          <TabHeading
            key={heading}
            heading={heading}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />
        ))}
      </div>

      {tabs.map((tab) => (
        <TabContent key={tab.props.heading} tab={tab} activeTab={activeTab} />
      ))}
    </div>
  )
}

Tabs.Item = ({ children }) => {
  return (
    <div className="mt-6">
      <div className="bg-[#F9F9F9] p-4">{children}</div>
    </div>
  )
}

const TabHeading: RFC<TabHeadingProps> = ({
  heading: tab,
  activeTab,
  onSelectTab,
}) => {
  const activeTabStyle =
    "text-[#00B964] bg-[#FCFCFC] border-b-2 border-[#00B964]"
  const inActiveTabStyle = "text-[#667085]"

  return (
    <span
      className={`text-sm cursor-pointer p-3 ${
        tab === activeTab ? activeTabStyle : inActiveTabStyle
      }`}
      onClick={() => {
        onSelectTab(tab)
      }}
    >
      {tab}
    </span>
  )
}

const TabContent: RFC<TabContentProps> = ({ tab, activeTab }) => {
  return tab.props.heading == activeTab ? <div>{tab.props.children}</div> : null
}

export default Tabs

type Tabs = RFC<TabsProps> & { Item: RFC<TabItemProps> }

type TabsProps = {
  activeTab?: string
  children: ReactElement<TabItemProps>[] | ReactElement<TabItemProps>
}

type TabItemProps = {
  heading: string
  children: ReactNode
}

type TabHeadingProps = {
  heading: string
  activeTab: string
  onSelectTab: Dispatch<SetStateAction<string>>
}

type TabContentProps = {
  activeTab: string
  tab: ReactElement<TabItemProps>
}
