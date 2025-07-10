import {Link} from "react-router"
import {
  Users,
  BarChart2,
  Shield,
  Eye,
  TrendingUp,
  Activity,
  Clock,
  UserCheck,
} from "lucide-react"


const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-01-15T10:30:00Z",
    urlCount: 25,
    totalClicks: 1250,
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: "2023-02-20T14:45:00Z",
    urlCount: 18,
    totalClicks: 890,
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    createdAt: "2023-03-10T09:15:00Z",
    urlCount: 42,
    totalClicks: 2100,
    status: "active",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    createdAt: "2023-04-05T16:20:00Z",
    urlCount: 12,
    totalClicks: 560,
    status: "active",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    createdAt: "2023-05-12T11:30:00Z",
    urlCount: 8,
    totalClicks: 320,
    status: "suspended",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    createdAt: "2023-06-18T13:45:00Z",
    urlCount: 35,
    totalClicks: 1750,
    status: "active",
  },
]


const mockAnalytics = {
  todayClicks: 1247,
  yesterdayClicks: 1156,
  lifetimeClicks: 125847,
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter((user) => user.status === "active").length,
  totalUrls: mockUsers.reduce((sum, user) => sum + user.urlCount, 0),
}

export const AdminDashboard=()=> {

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status) => {
    if (status === "active") {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
    } else if (status === "suspended") {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Suspended</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Overview of system statistics and user management</p>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Today's Clicks</p>
                  <p className="text-2xl font-bold">{mockAnalytics.todayClicks.toLocaleString()}</p>
                  <p className="text-xs text-green-500 mt-1">↑ 8% from yesterday</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Yesterday's Clicks</p>
                  <p className="text-2xl font-bold">{mockAnalytics.yesterdayClicks.toLocaleString()}</p>
                  <p className="text-xs text-blue-500 mt-1">Daily average</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Lifetime Clicks</p>
                  <p className="text-2xl font-bold">{mockAnalytics.lifetimeClicks.toLocaleString()}</p>
                  <p className="text-xs text-purple-500 mt-1">All time total</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 mr-4">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">{mockAnalytics.totalUsers}</p>
                  <p className="text-xs text-indigo-500 mt-1">{mockAnalytics.activeUsers} active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total URLs</p>
                  <p className="text-xl font-bold">{mockAnalytics.totalUrls}</p>
                </div>
                <div className="p-2 rounded-full bg-orange-100">
                  <Shield className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <p className="text-xl font-bold">{mockAnalytics.activeUsers}</p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <UserCheck className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg Clicks/User</p>
                  <p className="text-xl font-bold">
                    {Math.round(mockAnalytics.lifetimeClicks / mockAnalytics.totalUsers)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <BarChart2 className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Users section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Users</h2>
                  <p className="text-sm text-gray-500">Manage and monitor user accounts</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link
                    href="/admin/users"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View All Users
                  </Link>
                </div>
              </div>
            </div>

            {/* Users table - Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <span>Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <span>Created</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      <div className="flex items-center">
                        <span>URLs</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.urlCount}</div>
                        <div className="text-xs text-gray-500">{user.totalClicks} clicks</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          title="View URLs (Coming Soon)"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View URLs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Users list - Mobile */}
            <div className="md:hidden">
              {mockUsers.map((user) => (
                <div key={user.id} className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-600">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    {getStatusBadge(user.status)}
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <div className="font-medium">{formatDate(user.createdAt)}</div>
                    </div>
                   
                  </div>
                  <div>
                      <span className="text-gray-500">URLs:</span>
                      <div className="font-medium">
                        {user.urlCount} ({user.totalClicks} clicks)
                      </div>
                    </div>
                  <div className="flex justify-end">
                    <button
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                      title="View URLs (Coming Soon)"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View URLs
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {mockUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
  )
}
