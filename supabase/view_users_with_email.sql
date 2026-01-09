-- Create a view to see user profiles with email addresses
-- This view joins user_profiles with auth.users to display email

CREATE OR REPLACE VIEW public.user_profiles_with_email AS
SELECT 
  up.id,
  up.user_id,
  au.email,
  up.username,
  up.preferred_background,
  up.theme,
  up.created_at,
  up.updated_at,
  au.email_confirmed_at,
  au.created_at as user_created_at
FROM public.user_profiles up
JOIN auth.users au ON up.user_id = au.id;

-- Grant access to the view (adjust permissions as needed)
-- Note: This view will be accessible to authenticated users
-- You may want to add RLS policies if needed

-- To see this view in Supabase Table Editor:
-- 1. Go to Table Editor
-- 2. Look for "user_profiles_with_email" in the table list
-- 3. Or run: SELECT * FROM user_profiles_with_email;
