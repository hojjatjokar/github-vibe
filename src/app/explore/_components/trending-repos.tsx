import { List, Typography, Alert, Button } from "antd"
import { useGetSearchRepositoriesQuery } from "../../../store/generatedApi"
import { RepositoryListItem } from "@/components/list-items/repository-item"

const getTrendingDateQuery = (timeWindowDays = 30) => {
  const sinceDate = new Date()
  sinceDate.setDate(sinceDate.getDate() - timeWindowDays)
  return `created:>${sinceDate.toISOString().split("T")[0]}`
}

function TrendingRepos() {
  const { data, isError, isFetching, refetch } = useGetSearchRepositoriesQuery({
    q: getTrendingDateQuery(),
    sort: "stars",
    order: "desc",
  })

  if (isError) {
    return (
      <Alert
        type="error"
        message="Failed to load trending repositories"
        description="Please check your network connection and try again"
        action={
          <Button type="primary" onClick={refetch}>
            Retry
          </Button>
        }
      />
    )
  }

  return (
    <section className="bg-white">
      <Typography.Title level={3} className="!m-0 p-4">
        🔥 Trending Repos
      </Typography.Title>
      <List
        className="overflow-scroll h-[calc(100vh-310px)]"
        loading={isFetching}
        itemLayout="vertical"
        dataSource={data?.items || []}
        renderItem={(repo) => <RepositoryListItem repo={repo} />}
        locale={{ emptyText: "No trending repositories found" }}
      />
    </section>
  )
}

export { TrendingRepos }
