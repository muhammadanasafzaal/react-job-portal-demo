

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Trash2, ExternalLink, Search, Filter, Calendar, Building2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { unsaveJob } from "@/store/slices/userSlice"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export default function MyJobsPage() {
  const dispatch = useAppDispatch()
  const { savedJobs, appliedJobs } = useAppSelector((state) => state.user)
  const [activeTab, setActiveTab] = useState("saved")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  // Generate interviews from applied jobs
  const mockInterviews = appliedJobs.slice(0, 3).map((job, index) => {
    const interviewDate = new Date()
    interviewDate.setDate(interviewDate.getDate() + index + 1)

    return {
      id: job.id,
      jobTitle: job.title,
      company: job.company.name,
      companyLogo: job.company.logo,
      date: interviewDate.toISOString().split("T")[0],
      time: index === 0 ? "2:00 PM" : index === 1 ? "10:00 AM" : "3:30 PM",
      type: index % 2 === 0 ? "Video Call" : "On-site",
      status: index === 0 ? "Scheduled" : "Confirmed",
      location: index % 2 === 0 ? "Remote" : job.location,
    }
  })

  const filteredSavedJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredAppliedJobs = appliedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUnsaveJob = (jobId: string) => {
    dispatch(unsaveJob(jobId))
    toast.success("Job removed from saved jobs")
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
        <p className="text-gray-600">Manage your saved jobs, applications, and track your progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{savedJobs.length}</div>
            <p className="text-sm text-gray-600">Saved Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{appliedJobs.length}</div>
            <p className="text-sm text-gray-600">Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{mockInterviews.length}</div>
            <p className="text-sm text-gray-600">Interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">
              {appliedJobs.filter((job) => job.applicationStatus === "Under Review").length}
            </div>
            <p className="text-sm text-gray-600">Under Review</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="title">Job Title</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          <TabsTrigger value="applied">Applied ({appliedJobs.length})</TabsTrigger>
          <TabsTrigger value="interviews">Interviews ({mockInterviews.length})</TabsTrigger>
          <TabsTrigger value="offers">Offers (1)</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSavedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                        <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <p className="text-sm text-gray-600">{job.company.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnsaveJob(job.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Saved {job.savedAt ? new Date(job.savedAt).toLocaleDateString() : "Recently"}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">Apply Now</Button>
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredSavedJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No saved jobs match your search" : "No saved jobs yet"}
              </p>
              <Link to="/">
                <Button>Browse Jobs</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="applied" className="mt-6">
          <div className="space-y-4">
            {filteredAppliedJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                        <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company.name}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>
                            Applied {job.appliedAt ? new Date(job.appliedAt).toLocaleDateString() : "Recently"}
                          </span>
                          <span>•</span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className={`mb-2 ${
                          job.applicationStatus === "Under Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.applicationStatus === "Interview Scheduled"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.applicationStatus || "Under Review"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">
                            View Job
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredAppliedJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No applications match your search" : "No applications yet"}
              </p>
              <Link to="/">
                <Button>Find Jobs to Apply</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="interviews" className="mt-6">
          <div className="space-y-4">
            {mockInterviews.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={interview.companyLogo || "/placeholder.svg"} alt={interview.company} />
                        <AvatarFallback>{interview.company.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{interview.jobTitle}</h3>
                        <p className="text-gray-600">{interview.company}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(interview.date).toLocaleDateString()} at {interview.time}
                          </div>
                          <span>•</span>
                          <span>{interview.type}</span>
                          <span>•</span>
                          <span>{interview.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`mb-2 ${
                          interview.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : interview.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {interview.status}
                      </Badge>
                      <div className="flex space-x-2">
                        {interview.type === "Video Call" ? (
                          <Button size="sm">Join Call</Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            Get Directions
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {mockInterviews.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h3>
              <p className="text-gray-500">Your upcoming interviews will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="offers" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg" alt="TechCorp" />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">Senior Product Designer</h3>
                    <p className="text-gray-600">TechCorp Inc.</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>Offer received: Jan 20, 2025</span>
                      <span>•</span>
                      <span>$120,000 - $150,000</span>
                      <span>•</span>
                      <span>Remote</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="mb-2 bg-green-100 text-green-800">Offer Received</Badge>
                  <div className="flex space-x-2">
                    <Button size="sm">Accept Offer</Button>
                    <Button variant="outline" size="sm">
                      Negotiate
                    </Button>
                    <Button variant="outline" size="sm">
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
