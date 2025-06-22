

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, Eye, Edit, Trash2, Search, Plus, File, ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface Document {
  id: string
  name: string
  type: "resume" | "cover-letter" | "certificate" | "portfolio" | "other"
  size: string
  uploadDate: string
  lastModified: string
  status: "active" | "draft" | "archived"
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Albert_Flores_Resume_2025.pdf",
    type: "resume",
    size: "2.4 MB",
    uploadDate: "2025-01-15",
    lastModified: "2025-01-20",
    status: "active",
  },
  {
    id: "2",
    name: "Cover_Letter_Google.pdf",
    type: "cover-letter",
    size: "1.2 MB",
    uploadDate: "2025-01-10",
    lastModified: "2025-01-18",
    status: "active",
  },
  {
    id: "3",
    name: "UX_Design_Certificate.pdf",
    type: "certificate",
    size: "3.1 MB",
    uploadDate: "2024-12-20",
    lastModified: "2024-12-20",
    status: "active",
  },
  {
    id: "4",
    name: "Portfolio_2025.pdf",
    type: "portfolio",
    size: "15.7 MB",
    uploadDate: "2025-01-05",
    lastModified: "2025-01-19",
    status: "active",
  },
  {
    id: "5",
    name: "Draft_Resume_v2.pdf",
    type: "resume",
    size: "2.1 MB",
    uploadDate: "2025-01-22",
    lastModified: "2025-01-22",
    status: "draft",
  },
]

const getDocumentIcon = (type: string) => {
  switch (type) {
    case "resume":
      return <FileText className="w-8 h-8 text-blue-600" />
    case "cover-letter":
      return <File className="w-8 h-8 text-green-600" />
    case "certificate":
      return <FileText className="w-8 h-8 text-purple-600" />
    case "portfolio":
      return <ImageIcon className="w-8 h-8 text-orange-600" />
    default:
      return <FileText className="w-8 h-8 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    case "archived":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [documents] = useState<Document[]>(mockDocuments)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || doc.type === activeTab
    return matchesSearch && matchesTab
  })

  const handleUpload = () => {
    toast.success("File upload functionality would be implemented here")
  }

  const handleDownload = (docName: string) => {
    toast.success(`Downloading ${docName}`)
  }

  const handleView = (docName: string) => {
    toast.success(`Opening ${docName} for preview`)
  }

  const handleEdit = (docName: string) => {
    toast.success(`Opening ${docName} for editing`)
  }

  const handleDelete = (docName: string) => {
    toast.success(`${docName} deleted successfully`)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">Manage your resumes, cover letters, and other job-related documents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
            <p className="text-sm text-gray-600">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter((d) => d.status === "active").length}
            </div>
            <p className="text-sm text-gray-600">Active Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {documents.filter((d) => d.status === "draft").length}
            </div>
            <p className="text-sm text-gray-600">Draft Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {documents.filter((d) => d.type === "resume").length}
            </div>
            <p className="text-sm text-gray-600">Resumes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Upload */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleUpload} className="inline-flex items-center">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="resume">Resumes</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letters</TabsTrigger>
          <TabsTrigger value="certificate">Certificates</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{getDocumentIcon(doc.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                      <div className="mt-1 flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {doc.type.replace("-", " ")}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(doc.status)}`}>{doc.status}</Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Size: {doc.size}</p>
                        <p>Modified: {new Date(doc.lastModified).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(doc.name)} className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc.name)} className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>

                  <div className="mt-2 flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(doc.name)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(doc.name)}
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Upload your first document to get started"}
              </p>
              <Button onClick={handleUpload}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
