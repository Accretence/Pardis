import { Button, IconArrowLeft } from '@packages/ui'

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="-ml-2 2xl:absolute 2xl:top-[2px] 2xl:-left-24">
      <Button type="text" icon={<IconArrowLeft />} onClick={onClick}>
        Back
      </Button>
    </div>
  )
}

export default BackButton