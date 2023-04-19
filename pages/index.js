import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { ConnectButton } from 'web3uikit'
import { useRouter } from 'next/router';

import Link from 'next/link'

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [certificates,setCertificates] = useState([])
  const [skills, setSkills] = useState([]);
  const [emailError, setEmailError] = useState(true);
  const [usernameError, setUsernameError] = useState(true);
  const [title,setTitle] = useState('');
  const [org,setOrg] = useState('');
  const [link,setLink] = useState('');
  const {account} = useMoralis();
  const skillsets = [
    'React.js',
    'AngularJS',
    'Vue.js',
    'Ember.js',
    'Backbone.js',
    'Node.js',
    'Django',
    'Spring Boot',
    'Flutter',
    'React Native',
    'Xamarin',
    'Swift',
    'Kotlin',
    'MySQL',
    'MongoDB',
    'Oracle',
    'PostgreSQL',
    'SQL Server',
    'Amazon Web Services (AWS)',
    'Microsoft Azure',
    'Google Cloud Platform (GCP)',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Ansible',
    'Terraform',
    'JavaScript',
    'Python',
    'Java',
    'Ruby',
    'C++',
    'Jest',
    'Selenium',
    'Cypress',
    'JUnit',
    'Pytest',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Keras',
    'OpenCV'
    ];

    const handleAddCertificate = () => {
      const certificate = {title:title, organization:org,link:link}
      setCertificates([...certificates, certificate]);
      setTitle('');
      setOrg('');
      setLink('');
      console.log(certificates)
    };
    
    const handleDeleteCertificate = (index) => {
      const newCertificates = [...certificates];
      newCertificates.splice(index, 1);
      setCertificates(newCertificates);
      console.log(certificates)

    };


    const CertificateCard = ({ certificate, index }) => {
      return (
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor={`title${index}`} >Title:</label>
              <p id={`title${index}`} className="card-text">{certificate.title}</p>
            </div>
            <div className="form-group">
              <label htmlFor={`organization${index}`} >Organization:</label>
              <p id={`organization${index}`} className="card-text">{certificate.organization}</p>
            </div>
            <a href={certificate.link} className="btn btn-sm text-white btn-primary">
              View Certificate
            </a>
            <button
              className="btn btn-danger float-right"
              onClick={() => handleDeleteCertificate(index)}
            >
              <span>&times;</span>
            </button>
          </div>
        </div>
      );
    };


  const handleSkillAdd = (e) => {
    const selectedSkill = e.target.value;
    if (!skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }    
  }

  const validatemail = (e)=>{
    setEmail(e.target.value)
    if ( !/^\S+@\S+\.\S+$/.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  const validateusername = (e)=>{
    setUsername(e.target.value)
    if (!e.target.value) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSignup = (e) => {
    e.preventDefault();
      
  fetch('http://localhost:5000/api/users/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username,
    email,
    walletID: account,
    location,
    bio,
    skills,
    certificates: certificates.map(cert => ({
      title: cert.title,
      organization: cert.organization,
      link: cert.link
    }))
  })
})
  .then(() => {
    router.push('/users');
  })
  .catch((error) => {
    console.error(error);
  });
  }
  return (
    <div className="container p-5">
      <div className='row d-flex justify-content-center'>
        <div className='col-sm-6 col-md-10'>
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={validateusername}
          required
        />
      {usernameError?<div className="text-danger" >Username cannot be blank</div>:<></>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={validatemail}
          required
        />
              {emailError?<div className="text-danger">Enter a valid email address</div>:<></>}

      </div>
      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          type="text"
          rows={3}
          className="form-control"
          id="bio"
          placeholder="Enter bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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
    <select
      className="form-control"
      id="skillSelect"
      onChange={handleSkillAdd}
    >
      <option defaultValue="">-- Select a skill --</option>
      {skillsets.map((item,key)=>{
          return <option key={key} value={key}>{item}</option>
      })}
    </select>
  </div>
  <div className="skills-list">
    {skills.map((skill, index) => (
      <span
        key={index}
        className="badge badge-secondary mr-2"
        onClick={() => handleSkillRemove(skill)}
      >
        {skillsets[skill]} &times;
      </span>
    ))}
  </div>
</div>


<div className="form-group">
  <label htmlFor="certificates">Certificates</label>
  <ul>
  {certificates.map((certificate, index) => {
    return <CertificateCard certificate={certificate} index={index}></CertificateCard>

})}
  </ul>
  <button type="button" className="btn" data-toggle="modal" data-target="#certificateModal">
  Add Certificate
</button>
</div>


      {/* <Link  className={`btn btn-primary ${(emailError || usernameError)?'disabled':''} text-white`} href={(emailError || usernameError)?'':'/users'} onClick={handleSignup}> */}
        <button disabled={usernameError || emailError} className='btn btn-primary test-white' onClick={handleSignup}>
        Sign up
        </button>
      {/* </Link> */}
      </form>:<p className='text-center'>Connect to your wallet to use the application</p>}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>

    <div className="modal fade" id="certificateModal" tabIndex="-1" role="dialog" aria-labelledby="certificateModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="certificateModalLabel">Add Certificate</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="certificateTitle">Title</label>
            <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter certificate title" />
          </div>
          <div className="form-group">
            <label htmlFor="certificateLink">Link</label>
            <input type="text" className="form-control" value={link}  onChange={(e)=>setLink(e.target.value)} id="certificateLink" placeholder="Enter certificate link" />
          </div>
          <div className="form-group">
            <label htmlFor="certificateOrg">Organization</label>
            <input type="text" className="form-control" value={org} onChange={(e)=>setOrg(e.target.value)} id="certificateOrg" placeholder="Enter certificate organization" />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleAddCertificate}>Add</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
