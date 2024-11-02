
import { useEffect, useState } from "react"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export default function Dashboard() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token')
        
        if (!token) {
          console.error("No token found")
          return
        }

        const response = await axios.get("https://payverse.onrender.com/api/v1/user/showbalance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        // Round the balance to 2 decimal places
        const roundedBalance = Number(response.data.balance).toFixed(2)
        setBalance(parseFloat(roundedBalance))
      } catch (error) {
        console.error("Error fetching balance", error)
      }
    }

    fetchBalance()
  }, [])

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance.toFixed(2)} />
        <Users />
      </div>
    </div>
  )
}
