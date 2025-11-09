"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Home,
  Heart,
  Users,
  Wind,
  AlertTriangle,
  CheckCircle,
  Activity,
  Clock,
  MapPin,
  TreePine,
  Car,
} from "lucide-react";

interface SmartRecommendationsProps {
  selectedCity: string;
}

// Recommendations based on AQI levels and city-specific conditions
const recommendations = {
  bontang: {
    aqi: 78,
    status: "Moderate",
    color: "yellow",
    generalAdvice:
      "Air quality is acceptable for most people, but sensitive individuals may experience minor issues.",
    activities: [
      {
        icon: Activity,
        title: "Outdoor Exercise",
        advice: "Moderate intensity activities are okay",
        status: "caution",
        description:
          "Reduce prolonged or heavy outdoor activities if you experience symptoms.",
      },
      {
        icon: Users,
        title: "Sensitive Groups",
        advice: "Consider reducing outdoor activities",
        status: "warning",
        description:
          "Children, elderly, and people with respiratory conditions should limit outdoor exposure.",
      },
      {
        icon: Wind,
        title: "Windows & Ventilation",
        advice: "Keep windows closed during peak hours",
        status: "caution",
        description:
          "Use air purifiers indoors and limit natural ventilation during high pollution periods.",
      },
    ],
    healthTips: [
      "Stay hydrated and monitor air quality regularly",
      "Consider wearing N95 masks outdoors if sensitive",
      "Keep rescue medications accessible for those with asthma",
      "Industrial emissions peak during evening hours",
    ],
    localContext:
      "Bontang's air quality is influenced by industrial emissions from petrochemical plants and marine haze from nearby coastal areas.",
  },
  samarinda: {
    aqi: 95,
    status: "Moderate",
    color: "yellow",
    generalAdvice:
      "Air quality is acceptable, but may pose concerns for people who are unusually sensitive to air pollution.",
    activities: [
      {
        icon: Activity,
        title: "Outdoor Exercise",
        advice: "Light to moderate activities acceptable",
        status: "caution",
        description:
          "Avoid strenuous outdoor activities during peak traffic hours.",
      },
      {
        icon: Users,
        title: "Sensitive Groups",
        advice: "Limit prolonged outdoor activities",
        status: "warning",
        description:
          "Children and adults with respiratory conditions should reduce outdoor time.",
      },
      {
        icon: Home,
        title: "Indoor Air Quality",
        advice: "Use air purifiers and keep windows closed",
        status: "caution",
        description:
          "Maintain clean indoor air, especially during coal dust events.",
      },
    ],
    healthTips: [
      "Monitor symptoms closely if you have respiratory conditions",
      "Avoid outdoor activities near major roads during rush hours",
      "Consider air-filtering plants for indoor spaces",
      "Coal dust is highest during dry season (June-September)",
    ],
    localContext:
      "Samarinda experiences elevated pollution from coal mining dust, transportation emissions, and seasonal burning activities.",
  },
  balikpapan: {
    aqi: 112,
    status: "Unhealthy for Sensitive Groups",
    color: "orange",
    generalAdvice:
      "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
    activities: [
      {
        icon: Activity,
        title: "Outdoor Exercise",
        advice: "Avoid strenuous outdoor activities",
        status: "danger",
        description:
          "Limit outdoor exercise to early morning hours when pollution is typically lower.",
      },
      {
        icon: Users,
        title: "Sensitive Groups",
        advice: "Avoid all outdoor activities",
        status: "danger",
        description:
          "Children, elderly, and people with heart/lung conditions should stay indoors.",
      },
      {
        icon: Shield,
        title: "Protection Measures",
        advice: "Wear N95 masks when outdoors",
        status: "warning",
        description:
          "Use high-efficiency air filtration and consider postponing outdoor events.",
      },
    ],
    healthTips: [
      "Mandatory mask use for all outdoor activities",
      "Keep windows and doors closed at all times",
      "Run air purifiers continuously",
      "Port and refinery emissions peak during night shifts",
    ],
    localContext:
      "Balikpapan's air quality is significantly impacted by port activities, oil refinery emissions, and heavy vehicle traffic.",
  },
};

const statusColors = {
  yellow: {
    bg: "bg-yellow-50/80",
    border: "border-yellow-300",
    text: "text-yellow-900",
    icon: "text-yellow-700",
  },
  orange: {
    bg: "bg-orange-50/90",
    border: "border-orange-300",
    text: "text-orange-900",
    icon: "text-orange-700",
  },
  red: {
    bg: "bg-red-50/90",
    border: "border-red-300",
    text: "text-red-900",
    icon: "text-red-700",
  },
};

const activityStatusIcons = {
  good: CheckCircle,
  caution: AlertTriangle,
  warning: AlertTriangle,
  danger: AlertTriangle,
};

const activityStatusColors = {
  good: "text-green-600 bg-green-50",
  caution: "text-yellow-600 bg-yellow-50",
  warning: "text-orange-600 bg-orange-50",
  danger: "text-red-600 bg-red-50",
};

export default function SmartRecommendationsSection({
  selectedCity,
}: SmartRecommendationsProps) {
  const currentData =
    recommendations[selectedCity as keyof typeof recommendations] ||
    recommendations.bontang;
  const colorScheme =
    statusColors[currentData.color as keyof typeof statusColors];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
            Smart Health Recommendations
          </h2>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Personalized advice and precautions based on current air quality
            conditions.
          </p>
        </motion.div>

        {/* Current Status Alert */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          key={`${selectedCity}-alert`}
          className="mb-12"
        >
          <Card className={`bg-white shadow-lg ${colorScheme.border} border-2`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle
                  className={`h-8 w-8 ${colorScheme.icon} mt-1 flex-shrink-0`}
                />
                <div>
                  <h3
                    className={`text-xl font-semibold ${colorScheme.text} mb-2`}
                  >
                    Current Status: {currentData.status}
                  </h3>
                  <p
                    className={`${colorScheme.text} text-base leading-relaxed`}
                  >
                    {currentData.generalAdvice}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          key={`${selectedCity}-activities`}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-zinc-900 mb-8 text-center">
            Activity Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentData.activities.map((activity, index) => {
              const StatusIcon =
                activityStatusIcons[
                  activity.status as keyof typeof activityStatusIcons
                ];
              const statusColor =
                activityStatusColors[
                  activity.status as keyof typeof activityStatusColors
                ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <activity.icon className="h-6 w-6 text-zinc-700" />
                        <CardTitle className="text-lg">
                          {activity.title}
                        </CardTitle>
                      </div>
                      <div
                        className={`flex items-center space-x-2 px-3 py-2 rounded-full ${statusColor}`}
                      >
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {activity.advice}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-zinc-600 leading-relaxed">
                        {activity.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Health Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          key={`${selectedCity}-tips`}
          className="mb-16"
        >
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Heart className="h-6 w-6 text-red-500 mr-3" />
                Health Tips & Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentData.healthTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-50"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Local Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          key={`${selectedCity}-context`}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                Local Environmental Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-700 text-lg leading-relaxed">
                {currentData.localContext}
              </p>
              <div className="mt-4 flex items-center text-sm text-zinc-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  Data updated every hour • Recommendations refresh
                  automatically
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
