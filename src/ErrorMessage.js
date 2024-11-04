import React from 'react'

export default function ErrorMessage({error}) {
  return (
    <>
    {error && 
        <div className="error-mesage p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">Error </span>
            {Array.isArray(error.message) && error.message.length>0 ?error.message.map(err =>(
              <li>{err}</li>
            )) : <li>{error.message}</li>}
            
        </div>
        }
        </>
  )
}
