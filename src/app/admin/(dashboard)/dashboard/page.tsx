import StatCard from "../admin-dashboard-components/StatCard"

const Dashboard = () => {
  return (
    <div>
      {/* page title x subtitle */}
      <hgroup className="mb-3">
        <h1 className="text-3xl font-semibold text-[#101828] mb-0.5">
          Welcome back, Admin
        </h1>
        <p className=" text-[#475467]">
          Upload, Track and manage the expert’s tasks.
        </p>
      </hgroup>

      {/* stats */}
      <div className="flex gap-6 px-8 pt-8 mb-8">
        {stats.map((stat) => (
          <StatCard {...stat} />
        ))}
      </div>

      {/* toggle buttons x search x filters */}
      <div className="flex justify-between px-4 py-3">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Dashboard

const stats = [
  {
    title: "Pending Campaigns",
    value: "50"
  },
  {
    title: "Pending Withdrawals",
    value: "1,020"
  },
  {
    title: "Total Users",
    value: "1000"
  },
]