import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from 'components/Header'
import Task from 'components/Tasks'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { ConnectButton } from 'web3uikit'
import Link from 'next/link'

// export default function Home() {
//   return (
//     <>
    
//       {/* <Header/> */}
//         {/* <CreateTask/> */}
//       {/* <Task/> */}
//       </>
//   )
// }


export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState([])
  const {account} = useMoralis();
  const handleSkillAdd = (e) => {
    e.preventDefault();
    const skillInput = document.getElementById('skillInput')
    const newSkill = skillInput.value.trim()
    if (newSkill.length > 0) {
      setSkills([...skills, newSkill])
      skillInput.value = ''
    }
  }

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSignup = () => {
    // Call your signup function here with the collected data
    console.log({ email, username, location, skills })
  }
  return (
    <div className="container p-5">
      <div className='row d-flex justify-content-center'>
        <div className='col-sm-6'>
          <div className='container'>
      <div className='card shadow'>
        <div className='card-header text-center'>
        <h3 >Sign up</h3>
        </div>
        <div className='card-body'>
          <div className='container'>
            <div className='row d-flex justify-content-center py-5'>
              <div className='col-sm-6 d-flex justify-content-center'>
                  <ConnectButton/>
            </div>
            </div>
      {account?
      <form id="signupform">
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Wallet">Wallet ID</label>
        <input
          type="text"
          className="form-control"
          id="wallet"
          placeholder="Enter username"
          value={account}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="skills">Skills</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="skillInput"
            placeholder="Enter a skill"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSkillAdd}>
              Add
            </button>
          </div>
        </div>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="badge badge-secondary mr-2"
              onClick={() => handleSkillRemove(skill)}
            >
              {skill} &times;
            </span>
          ))}
        </div>
      </div>
      <Link href={'/users'}>
      <button className="btn btn-primary" href={'/users'} >
        Sign up
      </button>
      </Link>
      </form>:<p className='text-center'>Connect to your wallet to use the application</p>}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}
