

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus, Video, MapPin, Clock } from "lucide-react"
import { useAppSelector } from "@/store/hooks"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { appliedJobs } = useAppSelector((state) => state.user)

  // Generate mock interviews from applied jobs
  const mockInterviews = useMemo(() => {
    return appliedJobs.slice(0, 3).map((job, index) => {
      const interviewDate = new Date()
      interviewDate.setDate(interviewDate.getDate() + index + 1)

      return {
        id: job.id,
        company: job?.company?.name || "Unknown Company",
        title: job?.title+' Interview' || "Untitled Role",
        companyLogo: job?.company?.logo || "/placeholder.svg",
        date: interviewDate,
        time: index === 0 ? "2:00 PM" : index === 1 ? "10:00 AM" : "3:30 PM",
        type: index % 2 === 0 ? "video" : "onsite",
        status: index === 0 ? "confirmed" : "pending",
        jobId: job.id,
      }
    })
  }, [appliedJobs])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()
      const hasInterview = mockInterviews.some((interview) => interview?.date.toDateString() === date.toDateString())

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-100 p-2 cursor-pointer hover:bg-gray-50 ${isToday ? "bg-blue-50 border-blue-200" : ""
            } ${isSelected ? "bg-blue-100 border-blue-300" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</div>
          {hasInterview && (
            <div className="mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  const getInterviewsForDate = (date: Date) => {
    return mockInterviews.filter((interview) => interview?.date.toDateString() === date.toDateString())
  }

  const upcomingInterviews = mockInterviews
    .filter((interview) => interview?.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Calendar</h1>
        <p className="text-gray-600">Manage your interview schedule and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 border-b">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>

          {getInterviewsForDate(selectedDate).length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>
                  Events for{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getInterviewsForDate(selectedDate).map((interview) => (
                    <div key={interview?.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={interview?.companyLogo || "/placeholder.svg"} alt={interview?.company} />
                        <AvatarFallback>{interview?.company?.[0] || "?"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{interview?.title}</h4>
                        <p className="text-sm text-gray-600">{interview?.company}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {interview?.time}
                          </div>
                          <div className="flex items-center">
                            {interview?.type === "video" ? (
                              <Video className="w-4 h-4 mr-1" />
                            ) : (
                              <MapPin className="w-4 h-4 mr-1" />
                            )}
                            {interview?.type === "video" ? "Video Call" : "On-site"}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={interview?.status === "confirmed" ? "default" : "secondary"}
                        className={interview?.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {interview?.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Interviews</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => (
                    <div key={interview?.id} className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={interview?.companyLogo || "/placeholder.svg"} alt={interview?.company} />
                          <AvatarFallback>{interview?.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{interview?.title}</h4>
                          <p className="text-xs text-gray-600">{interview?.company}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {interview?.date.toLocaleDateString()} at {interview?.time}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${interview?.type === "video"
                              ? "border-blue-200 text-blue-700"
                              : "border-green-200 text-green-700"
                            }`}
                        >
                          {interview?.type === "video" ? "Video" : "On-site"}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No upcoming interviews</p>
                    <p className="text-xs text-gray-400 mt-1">Apply to jobs to schedule interviews</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <Badge variant="secondary">{mockInterviews.length} interviews</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Next Week</span>
                  <Badge variant="secondary">
                    {
                      mockInterviews.filter((i) => {
                        const nextWeek = new Date()
                        nextWeek.setDate(nextWeek.getDate() + 7)
                        return i.date <= nextWeek
                      }).length
                    }{" "}
                    interviews
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending</span>
                  <Badge variant="outline">
                    {mockInterviews.filter((i) => i.status === "pending").length} interviews
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
