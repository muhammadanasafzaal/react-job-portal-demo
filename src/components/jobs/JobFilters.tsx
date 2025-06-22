

import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { searchJobs, toggleFilter } from "@/store/slices/jobSlice"
import { useEffect, useState, useTransition } from "react"

const filterOptions = [
  { id: "frontend", label: "Frontend", active: false },
  { id: "backend", label: "Backend", active: false },
  { id: "graphic-designer", label: "Graphic Designer", active: false },
  { id: "full-stack", label: "Full Stack", active: false },
  { id: "mobile", label: "Mobile", active: false },
]

export default function JobFilters() {
  const dispatch = useAppDispatch()
  const { activeFilters } = useAppSelector((state) => state.jobs) 

  const [activeFilterId, setActiveFilterId] = useState("")
  // const [location, setLocation] = useState("")
  // const [jobType, setJobType] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleToggleFilter = (filterId: string) => {
    dispatch(toggleFilter(filterId))
    setActiveFilterId(filterId)
  }

  const handleSearch = (searchTerm: string) => {
    const location = ''
    const jobType = ''
    startTransition(() => {
      dispatch(searchJobs({ searchTerm, location, jobType }))
    })
  }

  useEffect(() => {
    console.log('ran', activeFilterId, activeFilters)
    if(activeFilters.includes(activeFilterId)) {
      const filtered = filterOptions.filter((item) => item.id === activeFilterId)
      console.log(filtered[0]?.label)
      handleSearch(filtered[0]?.label || "")
    }
  }, [activeFilters])
  

  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      Similar:
      {filterOptions.map((filter) => (
        <Badge
          key={filter.id}
          variant={activeFilters.includes(filter.id) ? "default" : "secondary"}
          className="cursor-pointer hover:bg-blue-100 transition-colors rounded-[5px] py-[7px] px-4 border border-gray-400 font-normal text-xs"
          onClick={() => handleToggleFilter(filter.id)}
        >
        {isPending ? "Searching..." : filter.label}
        </Badge>
      ))}
    </div>
  )
}
