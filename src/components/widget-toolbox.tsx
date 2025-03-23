import { Button, Row, Col, Tooltip } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { ReactNode, useCallback, useMemo, useRef } from "react"

export type Widget = {
  type: string
  id: number
}

type WidgetToolboxProps = {
  widgets: Widget[]
  setWidgets: (widgets: Widget[]) => void
  widgetsMeta: {
    type: string
    title: string
    icon?: ReactNode
    description?: string
  }[]
  maxWidgets?: number
}

function WidgetToolbox({
  widgets,
  setWidgets,
  widgetsMeta,
  maxWidgets = 3,
}: WidgetToolboxProps) {
  const idCounter = useRef(Date.now())
  const currentWidgetTypes = useMemo(
    () => new Set(widgets.map((w) => w.type)),
    [widgets],
  )

  const addWidget = useCallback(
    (type: string) => {
      const newWidget: Widget = {
        type,
        id: idCounter.current++,
      }
      setWidgets([...widgets, newWidget])
    },
    [widgets, setWidgets],
  )

  const maxReached = widgets.length >= maxWidgets

  return (
    <Row gutter={[16, 16]} justify="start" align="middle">
      {widgetsMeta.map((widget) => {
        const isDisabled = maxReached || currentWidgetTypes.has(widget.type)
        const tooltipContent = maxReached
          ? `Maximum of ${maxWidgets} widgets reached`
          : currentWidgetTypes.has(widget.type)
            ? "Widget already added"
            : widget.description || widget.title

        return (
          <Col key={widget.type} xs={24} sm={12} md={6} lg={4}>
            <Tooltip title={tooltipContent}>
              <Button
                block
                icon={widget.icon || <PlusCircleOutlined />}
                onClick={() => addWidget(widget.type)}
                disabled={isDisabled}
                aria-label={`Add ${widget.title} widget`}
                style={{ height: 50 }}
              >
                {widget.title}
              </Button>
            </Tooltip>
          </Col>
        )
      })}
    </Row>
  )
}

export { WidgetToolbox }
