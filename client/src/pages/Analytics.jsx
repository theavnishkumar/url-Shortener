import { useQuery } from "@tanstack/react-query";
import { getUrlAnalytics } from "../api/url";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Activity,
  BarChart2,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
} from "lucide-react";
import { LoadingSpinner } from "../components/LoadingSpinner";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Analytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analyticsUrl"],
    queryFn: getUrlAnalytics,
  });

  if (isLoading) return <LoadingSpinner />;

  // percentages for country stats
  const totalCountryClicks = data?.countryStats?.reduce(
    (sum, country) => sum + country.count,
    0
  );
  const countryDataWithPercentages = data?.countryStats?.map((country) => ({
    ...country,
    percentage:
      totalCountryClicks > 0
        ? Math.round((country.count / totalCountryClicks) * 100)
        : 0,
  }));

  // percentages for device stats
  const totalDeviceClicks = data?.deviceStats?.reduce(
    (sum, device) => sum + device.count,
    0
  );
  const deviceDataWithPercentages = data?.deviceStats?.map((device) => ({
    ...device,
    percentage:
      totalDeviceClicks > 0
        ? Math.round((device.count / totalDeviceClicks) * 100)
        : 0,
  }));

  // percentages for browser stats
  const totalBrowserClicks = data?.browserStats?.reduce(
    (sum, browser) => sum + browser.count,
    0
  );
  const browserDataWithPercentages = data?.browserStats?.map((browser) => ({
    ...browser,
    percentage:
      totalBrowserClicks > 0
        ? Math.round((browser.count / totalBrowserClicks) * 100)
        : 0,
  }));

  const timeBasedData = {
    labels: ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"],
    datasets: [
      {
        label: "Clicks",
        data: [data.today, data.yesterday, data.last7Days, data.last30Days],
        backgroundColor: [
          "rgba(79, 70, 229, 0.8)",
          "rgba(79, 70, 229, 0.6)",
          "rgba(79, 70, 229, 0.4)",
          "rgba(79, 70, 229, 0.2)",
        ],
        borderColor: "rgb(79, 70, 229)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const createDoughnutData = (data, labelKey) => ({
    labels: data?.map((item) => item[labelKey]),
    datasets: [
      {
        data: data?.map((item) => item.count),
        backgroundColor: [
          "#4F46E5",
          "#7C3AED",
          "#EC4899",
          "#EF4444",
          "#F59E0B",
          "#10B981",
          "#06B6D4",
          "#6B7280",
        ],
        borderWidth: 0,
      },
    ],
  });

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Page content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 md:hidden">
            Analytics
          </h1>
          <p className="text-gray-500">
            Track the performance of all your shortened URLs
          </p>
        </div>

        {/* stats overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-indigo-100 mr-3 sm:mr-4">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Today
                </p>
                <p className="text-lg sm:text-2xl font-bold">{data.today}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-indigo-100 mr-3 sm:mr-4">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Yesterday
                </p>
                <p className="text-lg sm:text-2xl font-bold">
                  {data.yesterday}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-indigo-100 mr-3 sm:mr-4">
                <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Last 7 Days
                </p>
                <p className="text-lg sm:text-2xl font-bold">
                  {data.last7Days}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-indigo-100 mr-3 sm:mr-4">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Last 30 Days
                </p>
                <p className="text-lg sm:text-2xl font-bold">
                  {data.last30Days}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* clicks chart */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Click</h2>
            <div className="h-64 sm:h-80">
              <Bar data={timeBasedData} options={barChartOptions} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Country*/}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Geographic
            </h2>
            <div className="h-64 sm:h-80 mb-4">
              <Doughnut
                data={createDoughnutData(countryDataWithPercentages, "_id")}
                options={doughnutOptions}
              />
            </div>
            <div className="space-y-2">
              {data?.countryStats?.map((country, index) => (
                <div
                  key={country._id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: [
                          "#4F46E5",
                          "#7C3AED",
                          "#EC4899",
                          "#EF4444",
                          "#F59E0B",
                          "#10B981",
                          "#06B6D4",
                          "#6B7280",
                        ][index % 8],
                      }}
                    ></div>
                    <span className="truncate">{country._id}</span>
                  </div>
                  <div className="flex items-center ml-2">
                    <span className="font-medium mr-2">{country.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Device Types
            </h2>
            <div className="h-64 sm:h-80 mb-4">
              <Doughnut
                data={createDoughnutData(deviceDataWithPercentages, "_id")}
                options={doughnutOptions}
              />
            </div>
            <div className="space-y-3">
              {data?.deviceStats?.map((device) => (
                <div
                  key={device._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {device._id === "Desktop" && (
                        <Monitor className="h-5 w-5 text-gray-400" />
                      )}
                      {device._id === "Mobile" && (
                        <Smartphone className="h-5 w-5 text-gray-400" />
                      )}
                      {device._id === "Tablet" && (
                        <Tablet className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm">{device._id}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">
                      {device.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser  */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Browser</h2>
            <div className="h-64 sm:h-80 mb-4">
              <Doughnut
                data={createDoughnutData(browserDataWithPercentages, "_id")}
                options={doughnutOptions}
              />
            </div>
            <div className="space-y-2">
              {data?.browserStats?.map((browser, index) => (
                <div
                  key={browser._id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: [
                          "#4F46E5",
                          "#7C3AED",
                          "#EC4899",
                          "#EF4444",
                          "#F59E0B",
                          "#10B981",
                          "#06B6D4",
                          "#6B7280",
                        ][index % 8],
                      }}
                    ></div>
                    <span className="truncate">{browser._id}</span>
                  </div>
                  <div className="flex items-center ml-2">
                    <span className="font-medium mr-2">{browser.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Countries</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.countryStats?.length}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Device Types</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.deviceStats?.length}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Browsers Used</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.browserStats?.length}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Clicks</p>
                <p className="text-xl font-bold text-gray-900">
                  {data?.last30Days}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
