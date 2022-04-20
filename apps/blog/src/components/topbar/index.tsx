import dynamic from 'next/dynamic'

const Topbar = dynamic(() => import('./topbar'), {
  ssr: false,
})

export default Topbar
