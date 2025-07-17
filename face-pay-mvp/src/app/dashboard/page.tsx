'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('sales')

  const mockTransactions = [
    { id: 1, customer: 'Ahmad Hassan', amount: 'RM 12.50', time: '09:15 AM' },
    { id: 2, customer: 'Siti Nurhaliza', amount: 'RM 8.00', time: '09:30 AM' },
    { id: 3, customer: 'Rahman Ali', amount: 'RM 15.25', time: '10:00 AM' },
    { id: 4, customer: 'Fatimah Zahra', amount: 'RM 6.75', time: '10:15 AM' },
  ]

  const mockCustomers = [
    { id: 1, name: 'Ahmad Hassan', phone: '+60123456789', status: 'Active', visits: 25 },
    { id: 2, name: 'Siti Nurhaliza', phone: '+60198765432', status: 'Active', visits: 18 },
    { id: 3, name: 'Rahman Ali', phone: '+60111234567', status: 'Active', visits: 12 },
    { id: 4, name: 'Fatimah Zahra', phone: '+60187654321', status: 'Active', visits: 8 },
  ]

  return (
    <div className="container">
      <div className="header">
        <h1>Merchant Dashboard</h1>
        <p>Kak Milah's Stall</p>
      </div>

      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
        <button 
          className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
        <button 
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'sales' && (
        <div className="card">
          <h2>Today's Sales</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <strong>Total Sales: RM 42.50</strong>
            </div>
            <div>
              <strong>Transactions: 4</strong>
            </div>
          </div>
          
          <h3>Recent Transactions</h3>
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div>
                <strong>{transaction.customer}</strong>
                <br />
                <small>{transaction.time}</small>
              </div>
              <div className="amount">{transaction.amount}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="card">
          <h2>Registered Customers</h2>
          <p>Total: {mockCustomers.length} customers</p>
          
          {mockCustomers.map((customer) => (
            <div key={customer.id} className="transaction-item">
              <div>
                <strong>{customer.name}</strong>
                <br />
                <small>{customer.phone}</small>
                <br />
                <small>Visits: {customer.visits}</small>
              </div>
              <div>
                <span className="status-indicator status-success" style={{ padding: '4px 8px', fontSize: '12px' }}>
                  {customer.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <h2>Sales Analytics</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
              <h3>Daily Average</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>RM 38.75</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
              <h3>Monthly Total</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>RM 1,162.50</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>Payment Methods</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
              <span>Gaze & Go:</span>
              <strong>85%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
              <span>QR Code:</span>
              <strong>15%</strong>
            </div>
          </div>

          <div>
            <h3>Peak Hours</h3>
            <p>Morning: 9:00 AM - 11:00 AM</p>
            <p>Evening: 6:00 PM - 8:00 PM</p>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <Link href="/payment" className="button" style={{ textDecoration: 'none', textAlign: 'center' }}>
          New Payment
        </Link>
        <Link href="/" className="button secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}