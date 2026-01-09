# Troubleshooting Login Issues

## "Invalid login credentials" Error

### Quick Fixes:

1. **Check Email Confirmation**
   - Go to Supabase Dashboard → Authentication → Users
   - Find your email and check if it's confirmed
   - If not confirmed, either:
     - Click the confirmation link in your email, OR
     - Disable email confirmation in Settings

2. **Disable Email Confirmation (for testing)**
   - Supabase Dashboard → Authentication → Settings
   - Toggle OFF "Enable email confirmations"
   - Save changes
   - Try logging in again

3. **Reset Password**
   - Use "Forgot password?" link on login page
   - Or reset from Supabase Dashboard

4. **Create New Test Account**
   - Go to `/signup` page
   - Create a new account
   - If email confirmation is disabled, you can log in immediately

5. **Verify Environment Variables**
   - Check `.env.local` file exists
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
   - Restart dev server: `npm run dev`

### Check Browser Console
- Press F12 → Console tab
- Look for any red error messages
- Share errors if you see any
