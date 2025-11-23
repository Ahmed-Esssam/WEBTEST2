import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const PUBLIC_FILE = /\.(.*)$/
export async function middleware(req: NextRequest) {
const { pathname } = req.nextUrl
if (pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname) || pathname === '/login' || pathname === '/api/auth/set' || pathname === '/api/auth/logout') {
return NextResponse.next()
}
const token = req.cookies.get('token')?.value
if (!token) {
const url = req.nextUrl.clone()
url.pathname = '/login'
return NextResponse.redirect(url)
}
return NextResponse.next()
}


export const config = {
matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
