import {useState, useEffect} from 'react'

const useCustomerData = () => {
  const [customer, setCustomerData] = useState(null)

  // useEffect(() => {
  //   debugger
  //   const data = localStorage.getItem('customer')
  //   if (data) {
  //     setCustomerData(JSON.parse(data))
  //   }
  // }, [])
  // debugger
  return JSON.parse(localStorage.getItem('customer'))
}

export default useCustomerData
