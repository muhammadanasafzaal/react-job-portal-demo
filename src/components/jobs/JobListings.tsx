

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadJobs } from "@/store/slices/jobSlice"
import JobCard from "./JobCard"
import { Button } from "@/components/ui/button"

export default function JobListings() {
  const dispatch = useAppDispatch()
  const { jobs, loading } = useAppSelector((state) => state.jobs)

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(loadJobs())
    }
  }, [dispatch, jobs.length])

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  const featuredJobs = jobs.filter((job) => job.featured).slice(0, 5)
  const recommendedJobs = jobs.filter((job) => job.recommended).slice(0, 5)
  const latestJobs = jobs.filter((job) => !job.featured && !job.recommended).slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Featured Jobs */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium text-gray-900">Featured Jobs</h2>
          <Button variant="link" className="text-blue-600 underline py-0 mb-2">
            See Featured Jobs
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Recommended Jobs */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium text-gray-900">Recommended Jobs</h2>
          <Button variant="link" className="text-blue-600 underline py-0 mb-2">
            See Recommended Jobs
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Latest Jobs */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium text-gray-900">Latest Jobs</h2>
          <Button variant="link" className="text-blue-600 underline py-0 mb-2">
            See Latest Jobs
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {latestJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  )
}
