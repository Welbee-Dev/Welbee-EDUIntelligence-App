const useUserData = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default useUserData
