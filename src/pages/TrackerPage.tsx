import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function TrackerPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Tracker</h1>
        <p className="text-gray-600">Track your job applications and their progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-sm text-gray-600">Applications Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <p className="text-sm text-gray-600">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-gray-600">Interviews Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">1</div>
            <p className="text-sm text-gray-600">Offers Received</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">UI/UX Designer at Google</span>
                <Badge className="bg-green-100 text-green-800">Interview Scheduled</Badge>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Applied 5 days ago</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Frontend Developer at Microsoft</span>
                <Badge variant="secondary">Under Review</Badge>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Applied 3 days ago</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Product Designer at Apple</span>
                <Badge variant="outline">Application Sent</Badge>
              </div>
              <Progress value={25} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Applied 1 day ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
