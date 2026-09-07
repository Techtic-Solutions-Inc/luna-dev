function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-['EB_Garamond'] text-[30px] font-[500] text-[#ffffff]">Dashboard</h2>
      <p className="text-[16px] text-[#828282]">
        This is a protected route. Only authenticated users can view this page.
      </p>
    </div>
  )
}

export default Dashboard
