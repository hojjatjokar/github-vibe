import { List, Typography, Tag, Space, Flex } from "antd"
import {
  StarOutlined,
  EyeOutlined,
  ForkOutlined,
  CalendarOutlined,
  SyncOutlined,
  BugOutlined,
} from "@ant-design/icons"
import { RepoSearchResultItem } from "../../store/generatedApi"
import Link from "next/link"

type RepositoryListItemProps = {
  repo: RepoSearchResultItem
}

function RepositoryListItem({ repo }: RepositoryListItemProps) {
  return (
    <List.Item className="!px-4">
      <List.Item.Meta
        title={
          <Link
            href={`/repos/${repo.owner?.login}/${repo.name}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {repo.full_name}
          </Link>
        }
        description={
          <Typography.Paragraph ellipsis={{ rows: 2 }} type="secondary">
            {repo.description}
          </Typography.Paragraph>
        }
        className="!mb-0"
      />

      <Space>
        <Tag icon={<StarOutlined />} color="gold">
          {repo.stargazers_count}
        </Tag>
        <Tag icon={<EyeOutlined />} color="blue">
          {repo.watchers_count}
        </Tag>
        <Tag icon={<ForkOutlined />} color="purple">
          {repo.forks_count}
        </Tag>
        <Tag icon={<BugOutlined />} color="red">
          {repo.open_issues_count}
        </Tag>
      </Space>
      <Flex justify="space-between" className="!mt-8">
        <Typography.Text>
          <CalendarOutlined /> <strong>Created:</strong>{" "}
          {new Date(repo.created_at).toLocaleDateString()}
        </Typography.Text>
        <Typography.Text>
          <SyncOutlined /> <strong>Updated:</strong>{" "}
          {new Date(repo.updated_at).toLocaleDateString()}
        </Typography.Text>
      </Flex>
    </List.Item>
  )
}

export { RepositoryListItem }
