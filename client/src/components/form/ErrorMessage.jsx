import React from "react"

const ErrorMessage = ({ err, visible, additionalClasses }) => {
  if (!err || !visible) return null
  return <div className={"text-red-700 " + additionalClasses}>{err}</div>
}

export default ErrorMessage
