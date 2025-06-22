

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Briefcase,
  Calendar,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "job_match" | "interview" | "message" | "application_update" | "profile_view" | "connection"
  title: string
  description: string
  timestamp: string
  read: boolean
  actionUrl?: string
  avatar?: string
  priority: "low" | "medium" | "high"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "interview",
    title: "Interview Reminder",
    description: "You have an interview with Google tomorrow at 2:00 PM for UI/UX Designer position",
    timestamp: "2025-01-22T10:00:00Z",
    read: false,
    priority: "high",
    avatar: "/google-logo.png",
  },
  {
    id: "2",
    type: "message",
    title: "New Message from Sarah Johnson",
    description: "Hi Albert! We'd love to schedule an interview with you...",
    timestamp: "2025-01-22T09:30:00Z",
    read: false,
    priority: "medium",
    avatar: "/female-avatar.jpg",
  },
  {
    id: "3",
    type: "job_match",
    title: "New Job Match",
    description: "Frontend Developer at Microsoft - 95% match with your profile",
    timestamp: "2025-01-22T08:15:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: "4",
    type: "application_update",
    title: "Application Status Update",
    description: "Your application for Product Designer at Apple has been reviewed",
    timestamp: "2025-01-21T16:45:00Z",
    read: true,
    priority: "medium",
  },
  {
    id: "5",
    type: "profile_view",
    title: "Profile Views",
    description: "5 recruiters viewed your profile in the last 24 hours",
    timestamp: "2025-01-21T14:20:00Z",
    read: true,
    priority: "low",
  },
  {
    id: "6",
    type: "connection",
    title: "New Connection Request",
    description: "Michael Chen wants to connect with you",
    timestamp: "2025-01-21T12:10:00Z",
    read: true,
    priority: "low",
    avatar: "/male-avatar.jpg",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "job_match":
      return <Briefcase className="w-5 h-5 text-blue-600" />
    case "interview":
      return <Calendar className="w-5 h-5 text-green-600" />
    case "message":
      return <MessageSquare className="w-5 h-5 text-purple-600" />
    case "application_update":
      return <TrendingUp className="w-5 h-5 text-orange-600" />
    case "profile_view":
      return <Star className="w-5 h-5 text-yellow-600" />
    case "connection":
      return <Users className="w-5 h-5 text-indigo-600" />
    default:
      return <Bell className="w-5 h-5 text-gray-600" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else {
    return date.toLocaleDateString()
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast.success("Marked as read")
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast.success("All notifications marked as read")
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    toast.success("Notification deleted")
  }

  const handleClearAll = () => {
    setNotifications([])
    toast.success("All notifications cleared")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your job search activities</p>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline" onClick={handleClearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <p className="text-sm text-gray-600">Total Notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <p className="text-sm text-gray-600">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {notifications.filter((n) => n.type === "interview").length}
            </div>
            <p className="text-sm text-gray-600">Interview Updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {notifications.filter((n) => n.type === "job_match").length}
            </div>
            <p className="text-sm text-gray-600">Job Matches</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread{" "}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="job_match">Jobs</TabsTrigger>
          <TabsTrigger value="interview">Interviews</TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
          <TabsTrigger value="application_update">Applications</TabsTrigger>
          <TabsTrigger value="profile_view">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="Avatar" className="object-cover" />
                              <AvatarFallback>{getNotificationIcon(notification.type)}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                                <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BellOff className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-500">
                    {activeTab === "unread"
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications in this category."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
