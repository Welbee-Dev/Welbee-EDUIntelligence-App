// import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

// import {useCallback} from 'react'
// import {Navigate} from 'react-router-dom'

export default function navigateToScreen(path, token) {
  const navigate = useNavigate()
  return navigate(path, {state: {token: token}})
}
//   const navigate = useCallback((path, token) => {
//     return (
//       <Navigate
//         to={path}
//         replace
//         state={{token: token}}
//       />
//     )
//   }, [])
//   return [navigate]
//}
