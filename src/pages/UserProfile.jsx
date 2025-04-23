import React from 'react'

function UserProfile() {

    const user = {
        name: "Jone Doe",
        email:"johndoe@gmail.com",
        phoneNumber: "+91 9012546789",
        address:"Manduwala, Clock tower, dehradun"
    }

    const orderHistory =[

    { id: 1, item: "Asus ROG Zephyrus G14", date: "2025-04-01", status: "Delivered" },
    { id: 2, item: "iPhone 15 Pro Max", date: "2025-03-15", status: "Shipped" },

    ] 

  return (
    <>
    <div className='container my-3'>
        <h1>User Profile</h1>
        <div className='card my-3'>
            <div className='card-body'>
                <h5>Name: {user.name}</h5>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                <p><strong>Address:</strong> {user.address}</p>
            </div>
        </div>

        <h4 className=''>Order History</h4>
        <ul className='list-group'>
        {orderHistory.map((order) => (
            <li key={order.id} className='list-group-item'>
                {order.item} - {order.date} - {order.status}
            </li>
          ))}
        </ul>
        
    </div>
    </>
  )
}

export default UserProfile
