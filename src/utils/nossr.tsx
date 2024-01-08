// /components/NoSsr.js
import dynamic from 'next/dynamic'

const NoSsr = ({ children }: { children: React.ReactNode }) => <>{children}</>

export default dynamic(() => Promise.resolve(NoSsr), {
    ssr: false,
    loading: () => <div className='main-content-loading-234frg'>
        <h1>LOADING.....</h1>
    </div>
})