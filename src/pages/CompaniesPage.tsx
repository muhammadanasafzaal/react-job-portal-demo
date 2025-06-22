import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Users, Star } from "lucide-react"

const topCompanies = [
  {
    id: 1,
    name: "Google",
    logo: "/google-logo.png",
    industry: "Technology",
    location: "Mountain View, CA",
    employees: "100,000+",
    rating: 4.5,
    openJobs: 1250,
    description: "A multinational technology company that specializes in Internet-related services and products.",
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "/microsoft-logo.png",
    industry: "Technology",
    location: "Redmond, WA",
    employees: "200,000+",
    rating: 4.4,
    openJobs: 980,
    description:
      "An American multinational technology corporation that develops and sells computer software, consumer electronics, and personal computers.",
  },
  {
    id: 3,
    name: "Apple",
    logo: "/apple-logo.png",
    industry: "Technology",
    location: "Cupertino, CA",
    employees: "150,000+",
    rating: 4.3,
    openJobs: 750,
    description:
      "An American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
  },
  {
    id: 4,
    name: "Amazon",
    logo: "/amazon-logo.jpg",
    industry: "E-commerce",
    location: "Seattle, WA",
    employees: "1,500,000+",
    rating: 4.1,
    openJobs: 2100,
    description:
      "An American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  },
]

export default function CompaniesPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Companies</h1>
        <p className="text-gray-600">Discover leading companies and explore career opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16 rounded-none">
                  <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                  <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{company.name}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {company.industry}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {company.location}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span className="text-sm font-medium">{company.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {company.employees} employees
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {company.openJobs} open jobs
                </Badge>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    View Company
                  </Button>
                  <Button size="sm">View Jobs</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
