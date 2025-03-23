"use client"

import { Row, Col, Typography, Alert } from "antd"
import { useState } from "react"
import { TrendingRepos } from "./_components/trending-repos"
import { WidgetToolbox, Widget } from "@/components/widget-toolbox"

const WIDGET_TYPES = {
  TRENDING_REPOS: "trending-repos",
} as const

const repositoryWidgetsMeta = [
  {
    type: WIDGET_TYPES.TRENDING_REPOS,
    title: "Trending Repos",
    component: TrendingRepos,
    description: "See currently trending repositories",
  },
]
function Explore() {
  const [widgets, setWidgets] = useState<Widget[]>([])

  return (
    <>
      <div className="mb-4">
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          Explore GitHub Ecosystem
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 16 }}>
          Discover trending repositories, top contributors, and curated awesome
          lists
        </Typography.Text>

        <div style={{ marginTop: 24 }}>
          <WidgetToolbox
            widgets={widgets}
            setWidgets={setWidgets}
            widgetsMeta={repositoryWidgetsMeta}
            maxWidgets={3}
          />
        </div>
      </div>

      <Row gutter={[16, 16]} align="stretch">
        {widgets.length === 0 && (
          <Col span={24}>
            <Alert
              message="No Widgets Selected"
              description="Use the toolbox above to add widgets"
              type="info"
              showIcon
            />
          </Col>
        )}

        {widgets.map((widget: Widget) => {
          const widgetConfig = repositoryWidgetsMeta.find(
            (w) => w.type === widget.type,
          )
          if (!widgetConfig) return null

          const WidgetComponent = widgetConfig.component
          return (
            <Col key={widget.id} md={12} lg={8}>
              <WidgetComponent />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Explore
