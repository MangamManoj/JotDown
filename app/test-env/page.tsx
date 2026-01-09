'use client'

export default function TestEnvPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">Environment Variables Check</h1>
        
        <div className="space-y-4">
          <div>
            <p className="font-semibold">NEXT_PUBLIC_SUPABASE_URL:</p>
            <p className="bg-gray-100 p-2 rounded break-all">
              {supabaseUrl || '❌ NOT SET'}
            </p>
            {supabaseUrl && (
              <p className="text-sm text-gray-600 mt-1">
                {supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co')
                  ? '✅ Format looks correct'
                  : '⚠️ Format might be incorrect (should start with https:// and end with .supabase.co)'}
              </p>
            )}
          </div>

          <div>
            <p className="font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY:</p>
            <p className="bg-gray-100 p-2 rounded break-all">
              {supabaseKey 
                ? `${supabaseKey.substring(0, 20)}...${supabaseKey.substring(supabaseKey.length - 10)}` 
                : '❌ NOT SET'}
            </p>
            {supabaseKey && (
              <p className="text-sm text-gray-600 mt-1">
                {supabaseKey.startsWith('eyJ')
                  ? '✅ Format looks correct (JWT token)'
                  : '⚠️ Format might be incorrect (should start with eyJ)'}
              </p>
            )}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="font-semibold text-yellow-800">Important:</p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
              <li>Make sure .env.local is in the project root (same folder as package.json)</li>
              <li>Restart the dev server after changing .env.local</li>
              <li>No quotes around values in .env.local</li>
              <li>No spaces around the = sign</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
