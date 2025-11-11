"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const chartData = {
  bontang: [
    { day: "Mon", aqi: 42, date: "Nov 4" },
    { day: "Tue", aqi: 48, date: "Nov 5" },
    { day: "Wed", aqi: 45, date: "Nov 6" },
    { day: "Thu", aqi: 39, date: "Nov 7" },
    { day: "Fri", aqi: 44, date: "Nov 8" },
    { day: "Sat", aqi: 47, date: "Nov 9" },
    { day: "Sun", aqi: 45, date: "Nov 10" },
  ],
  samarinda: [
    { day: "Mon", aqi: 72, date: "Nov 4" },
    { day: "Tue", aqi: 81, date: "Nov 5" },
    { day: "Wed", aqi: 78, date: "Nov 6" },
    { day: "Thu", aqi: 75, date: "Nov 7" },
    { day: "Fri", aqi: 73, date: "Nov 8" },
    { day: "Sat", aqi: 79, date: "Nov 9" },
    { day: "Sun", aqi: 78, date: "Nov 10" },
  ],
  balikpapan: [
    { day: "Mon", aqi: 118, date: "Nov 4" },
    { day: "Tue", aqi: 132, date: "Nov 5" },
    { day: "Wed", aqi: 125, date: "Nov 6" },
    { day: "Thu", aqi: 121, date: "Nov 7" },
    { day: "Fri", aqi: 129, date: "Nov 8" },
    { day: "Sat", aqi: 135, date: "Nov 9" },
    { day: "Sun", aqi: 125, date: "Nov 10" },
  ],
};

const getAQIColor = (city: string) => {
  const colors = {
    bontang: "#10b981", // Green - Good
    samarinda: "#f59e0b", // Yellow - Moderate
    balikpapan: "#ef4444", // Red - Unhealthy
  };
  return colors[city as keyof typeof colors] || colors.bontang;
};

const getAQIStatus = (city: string) => {
  const status = {
    bontang: "Good",
    samarinda: "Moderate",
    balikpapan: "Unhealthy",
  };
  return status[city as keyof typeof status] || status.bontang;
};

interface AQITrendChartProps {
  selectedCity: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const aqiValue = payload[0]?.value;
    const getAQIStatusFromValue = (aqi: number) => {
      if (aqi <= 50) return { status: "Good", color: "#10b981" };
      if (aqi <= 100) return { status: "Moderate", color: "#f59e0b" };
      if (aqi <= 150)
        return { status: "Unhealthy for Sensitive Groups", color: "#f97316" };
      return { status: "Unhealthy", color: "#ef4444" };
    };

    const statusInfo = getAQIStatusFromValue(aqiValue);

    return (
      <div className="bg-white/98 backdrop-blur-md border border-slate-300 rounded-lg p-4 shadow-xl">
        <p className="text-slate-700 text-sm font-semibold mb-2">
          {payload[0]?.payload?.date} ({label})
        </p>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: statusInfo.color }}
          />
          <span className="text-slate-900 text-lg font-bold">
            AQI: {aqiValue}
          </span>
        </div>
        <div className="text-sm text-slate-600">
          Status:{" "}
          <span className="font-semibold" style={{ color: statusInfo.color }}>
            {statusInfo.status}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function AQITrendChart({ selectedCity }: AQITrendChartProps) {
  const data =
    chartData[selectedCity as keyof typeof chartData] || chartData.bontang;
  const currentAQI = data[data.length - 1]?.aqi || 0;
  const previousAQI = data[0]?.aqi || 0;
  const trendChange = currentAQI - previousAQI;
  const isImproving = trendChange < 0;
  const chartColor = getAQIColor(selectedCity);
  const aqiStatus = getAQIStatus(selectedCity);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-12"
      style={{ backgroundColor: "#FAFAFA" }}
      key={`trend-${selectedCity}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          key={selectedCity}
        >
          <Card className="bg-white shadow-2xl border border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    AQI Trend (Last 7 Days)
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {selectedCity.charAt(0).toUpperCase() +
                      selectedCity.slice(1)}{" "}
                    air quality progression
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {isImproving ? (
                      <TrendingDown className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isImproving ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {isImproving ? "" : "+"}
                      {trendChange} this week
                    </span>
                  </div>
                  <div
                    className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: chartColor }}
                  >
                    {aqiStatus}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient
                        id={`gradient-${selectedCity}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={chartColor}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={chartColor}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                      {/* Subtle glow effect */}
                      <filter id={`glow-${selectedCity}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      strokeOpacity={0.6}
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      dx={-10}
                      label={{
                        value: "AQI Score",
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          textAnchor: "middle",
                          fill: "#6b7280",
                          fontSize: "14px",
                          fontWeight: "600",
                        },
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="aqi"
                      stroke={chartColor}
                      strokeWidth={3}
                      fill={`url(#gradient-${selectedCity})`}
                      fillOpacity={1}
                      dot={{
                        fill: chartColor,
                        strokeWidth: 2,
                        r: 5,
                        stroke: "#1e293b",
                        filter: `url(#glow-${selectedCity})`,
                      }}
                      activeDot={{
                        r: 7,
                        stroke: chartColor,
                        strokeWidth: 3,
                        fill: "#fff",
                        filter: `url(#glow-${selectedCity})`,
                      }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-slate-200">
              <p className="text-slate-500 text-sm">
                Data simulated for prototype • Updated every hour
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
