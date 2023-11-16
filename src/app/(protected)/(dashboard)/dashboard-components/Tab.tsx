import {
  Children,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import { RFC } from "@/app/common/types/Component"

const Tabset: RFC<TabsetProps> = ({ children, activeTab: initialTab }) => {
  const tabs = Children.map(children, (child) => child)
  const tabHeadings = tabs.map((tabElement) => tabElement.props.heading)
  const [activeTab, setActiveTab] = useState(
    initialTab ? initialTab : tabHeadings[0]
  )

  return (
    <div>
      <div className="flex gap-4">
        {tabHeadings.map((heading) => (
          <TabHeading
            heading={heading}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />
        ))}
      </div>
      <hr />

      {tabs.map((tab) => (
        <TabContent tab={tab} activeTab={activeTab} />
      ))}
    </div>
  )
}

const Tab: RFC<TabProps> = ({ children }) => {
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
  const activeTabStyle = "text-[#00B964] border-b-2 border-[#00B964]"
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
  return tab.props.heading == activeTab ? (
    <div className="p-4 mt-6">{tab.props.children}</div>
  ) : null
}

export { Tabset, Tab }

type TabsetProps = {
  activeTab?: string
  children: ReactElement<TabProps>[] | ReactElement<TabProps>
}

type TabProps = {
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
  tab: ReactElement<TabProps>
}
