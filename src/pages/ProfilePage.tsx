import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Mail, Edit, Download, Share2, ExternalLink, Plus } from "lucide-react"
import { useAppSelector } from "@/store/hooks"

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.user)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/user-avatar-2.jpg" alt={user.name} className="object-cover"/>
                    <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl flex">
                      {user.name}
                    </CardTitle>
                    <p className="text-lg text-gray-600">{user.title}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.location}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="sm:flex hidden">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 flex-wrap">
                <Button variant="outline" className="sm:hidden flex items-center sm:mr-2">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button className="sm:mb-0 mb-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" className="sm:mb-0 mb-2">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
                <Button variant="outline" className="sm:!ml-2 !ml-0 sm:mb-0 mb-2">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>About</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Passionate Senior Product Designer with over 5 years of experience creating user-centered digital
                experiences. Specialized in UI/UX design, graphic design, and web development. I thrive in collaborative
                environments and am always eager to tackle new challenges that push the boundaries of design and
                technology.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Experience</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-2 border-blue-200 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">Senior Product Designer</h3>
                    <p className="text-gray-600">TechCorp Inc.</p>
                    <p className="text-sm text-gray-500">Jan 2022 - Present · 3 yrs</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant="secondary">Current</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Lead design initiatives for multiple product lines, collaborating with cross-functional teams to
                  deliver user-centered solutions that increased user engagement by 40%.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["Product Design", "User Research", "Figma", "Design Systems"].map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-gray-200 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">UI/UX Designer</h3>
                    <p className="text-gray-600">DesignStudio</p>
                    <p className="text-sm text-gray-500">Mar 2020 - Dec 2021 · 1 yr 10 mos</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Designed and prototyped web and mobile applications for various clients, focusing on creating
                  intuitive and accessible user experiences.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["UI Design", "Prototyping", "Adobe Creative Suite", "Wireframing"].map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skills</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "Figma",
                  "Sketch",
                  "Adobe Creative Suite",
                  "Prototyping",
                  "User Research",
                  "HTML/CSS",
                  "JavaScript",
                  "React",
                  "Design Systems",
                  "Wireframing",
                  "User Testing",
                  "Information Architecture",
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="hover:bg-blue-100 cursor-pointer">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">E-commerce Mobile App Redesign</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Led the complete redesign of a mobile e-commerce application, resulting in 35% increase in conversion
                  rates.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["Mobile Design", "User Research", "A/B Testing"].map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">Design System Implementation</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Created and implemented a comprehensive design system across 5 product teams, improving design
                  consistency by 60%.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["Design Systems", "Component Library", "Documentation"].map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profile Visitors</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {user.stats.profileVisitors}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resume Viewers</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {user.stats.resumeViewers}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">My Jobs</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {user.stats.myJobs}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Connections</span>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                  247
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Bachelor of Design</h3>
                <p className="text-gray-600">University of Maryland</p>
                <p className="text-sm text-gray-500">2016 - 2020</p>
                <p className="text-sm text-gray-600 mt-1">
                  Graduated Magna Cum Laude with focus on Digital Design and User Experience
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Certifications</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Google UX Design Certificate</h4>
                <p className="text-sm text-gray-500">Issued: 2021 · Google</p>
              </div>
              <div>
                <h4 className="font-medium">Adobe Certified Expert</h4>
                <p className="text-sm text-gray-500">Issued: 2020 · Adobe</p>
              </div>
              <div>
                <h4 className="font-medium">Figma Advanced Certification</h4>
                <p className="text-sm text-gray-500">Issued: 2023 · Figma</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">English</span>
                <Badge variant="secondary">Native</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Spanish</span>
                <Badge variant="secondary">Professional</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">French</span>
                <Badge variant="secondary">Conversational</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
