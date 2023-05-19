import clsx from 'clsx'
import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { transformLink } from '~/utils/hook/transformLink'

const TextMessageShown: Component<{
  text: string
}> = (props) => {
  return <span class="whitespace-pre-wrap">{transformLink(props.text)}</span>
}

const AtMessageShown: Component<{
  qq: number
}> = (props) => {
  return <>@{props.qq}</>
}

const ReplyMessageShown: Component<{
  id: number
}> = (props) => {
  return <a href={`#${props.id}`}>[回复]</a>
}

const FaceMessageShown: Component<{
  id: number
}> = (props) => {
  return (
    <Show when={props.id <= 221} fallback={`[表情${props.id}]`}>
      <img
        class={clsx('inline-flex', 'h-24px')}
        src={`https://cdn.jsdelivr.net/gh/kyubotics/coolq-http-api@master/docs/qq-face/${props.id}.gif`}
        alt={`[表情${props.id}]`}
        style={
          "vertical-align: middle;"
        }
      />
    </Show>
  )
}

export {
  TextMessageShown,
  AtMessageShown,
  ReplyMessageShown,
  FaceMessageShown,
}
