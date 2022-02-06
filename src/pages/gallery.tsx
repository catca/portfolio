import Instructions from '@/components/dom/Instructions'
import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('@/components/canvas/Gallery'), {
  ssr: false,
})

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    <Instructions />
  )
}

const R3F = () => {
  return (
    <>
      <Gallery />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Gallery',
    },
  }
}
