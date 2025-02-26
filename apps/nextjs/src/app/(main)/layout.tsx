import Login from '~/app/login'
import CreatePost from '~/components/create-post'
import ThemeToggle from '~/components/theme-toggle'

const Layout = ({ children }: { readonly children: React.ReactNode }) => (
  <div className='p-2.5'>
    <div className='fixed top-2.5 right-2.5'>
      <ThemeToggle />
    </div>

    <Login />

    <CreatePost />

    {children}
  </div>
)

export default Layout
