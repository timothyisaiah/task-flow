import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
 secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnWhiteboard = nextUrl.pathname.startsWith('/whiteboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnHome = nextUrl.pathname === '/';
      
      // Allow whiteboard, login, and home pages for everyone
      if (isOnWhiteboard || isOnLogin || isOnHome) {
        return true;
      }
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;