

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile, Star } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    title: string
    company: string
    avatar: string
    online: boolean
  }
  lastMessage: Message
  unreadCount: number
  messages: Message[]
  starred: boolean
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "hr1",
      name: "Sarah Johnson",
      title: "HR Manager",
      company: "Google",
      avatar: "/female-avatar.jpg",
      online: true,
    },
    lastMessage: {
      id: "msg1",
      senderId: "hr1",
      content: "Hi Albert! We'd love to schedule an interview with you for the UI/UX Designer position.",
      timestamp: "2025-01-22T10:30:00Z",
      read: false,
    },
    unreadCount: 2,
    messages: [
      {
        id: "msg1",
        senderId: "hr1",
        content: "Hi Albert! We'd love to schedule an interview with you for the UI/UX Designer position.",
        timestamp: "2025-01-22T10:30:00Z",
        read: false,
      },
      {
        id: "msg2",
        senderId: "user",
        content: "Thank you for reaching out! I'm very interested in the position.",
        timestamp: "2025-01-22T09:15:00Z",
        read: true,
      },
    ],
    starred: true,
  },
  {
    id: "2",
    participant: {
      id: "hr2",
      name: "Michael Chen",
      title: "Technical Recruiter",
      company: "Microsoft",
      avatar: "/male-avatar.jpg",
      online: false,
    },
    lastMessage: {
      id: "msg3",
      senderId: "hr2",
      content: "Great portfolio! When would be a good time for a technical interview?",
      timestamp: "2025-01-21T16:45:00Z",
      read: true,
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg3",
        senderId: "hr2",
        content: "Great portfolio! When would be a good time for a technical interview?",
        timestamp: "2025-01-21T16:45:00Z",
        read: true,
      },
    ],
    starred: false,
  },
  {
    id: "3",
    participant: {
      id: "hr3",
      name: "Emily Rodriguez",
      title: "Talent Acquisition",
      company: "Apple",
      avatar: "/female-avatar-2.jpg",
      online: true,
    },
    lastMessage: {
      id: "msg4",
      senderId: "user",
      content: "I'm available for the interview on Friday at 2 PM.",
      timestamp: "2025-01-20T14:20:00Z",
      read: true,
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg4",
        senderId: "user",
        content: "I'm available for the interview on Friday at 2 PM.",
        timestamp: "2025-01-20T14:20:00Z",
        read: true,
      },
    ],
    starred: false,
  },
]

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participant.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    toast.success("Message sent!")
    setNewMessage("")
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Connect with recruiters and hiring managers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Badge variant="secondary">{conversations.length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-blue-50 border-l-blue-500"
                      : "border-l-transparent"
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={conversation.participant.avatar || "/placeholder.svg"}
                          alt={conversation.participant.name}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {conversation.participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{conversation.participant.name}</h4>
                        <div className="flex items-center space-x-1">
                          {conversation.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {conversation.participant.title} at {conversation.participant.company}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="mt-1 text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={selectedConversation.participant.avatar || "/placeholder.svg"}
                          alt={selectedConversation.participant.name}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {selectedConversation.participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.participant.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.participant.title} at {selectedConversation.participant.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <Separator />

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.senderId === "user" ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <Separator />

              {/* Message Input */}
              <div className="p-4 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
