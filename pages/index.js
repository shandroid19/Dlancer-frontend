import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { ConnectButton } from 'web3uikit'
import { useRouter } from 'next/router';
import { skillsets } from '@/constants';

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
  const [gitprofile,setGitprofile] = useState('');
  const [gitError,setGitError] = useState(true);
  const [org,setOrg] = useState('');
  const [loading,setLoading] = useState(false)
  const [link,setLink] = useState('');
  const [image,setImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU");
  const {account} = useMoralis();

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
      console.log(certificate.title)
      return (
        <div className="card shadow my-2">
          <div className="card-body">
            <div className="form-group">
              <h6 id={`title${index}`} className="card-text">{certificate.title}</h6>
            </div>
            <div className="form-group">
              <p id={`organization${index}`} className="card-text"> Issued by {certificate.organization}</p>
            </div>
            <a href={certificate.link} className="btn btn-sm text-white btn-primary">
              View Certificate
            </a>
            <button
              className="btn btn-danger float-right btn-sm"
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

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
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

  const validateGitProfile = (e)=>{
    setGitprofile(e.target.value)
    if (!e.target.value) {
      setGitError(true);
    } else {
      setGitError(false);
    }
  }


  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = uploadImage;
    input.click();
  };
  
  const uploadImage = async e=> {
    const files = e.target.files
    const data = new FormData()
    data.append('file',files[0])
    data.append('upload_preset','breedy')
    let filname=files[0].name.toLowerCase();
    if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
      {
        alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
        return;
      }
    setLoading(true)
    const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
    {
        method: 'POST',
        body:data
    })
    const file = await res.json()
    setImage(file.secure_url)
    setLoading(false)
  
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
    image,
    skills,
    ghUserName:gitprofile,
    certificates: certificates.map(cert => ({
      title: cert.title,
      org: cert.organization,
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
    <div className='bg2 vh-100 d-flex align-items-center'>
    <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" style={{height:'10rem',width:'10rem'}} onClick={handleImageClick}  src={image}/>
            <span >Upload image</span><span className="text-black-50">
              {account.slice(0,6)}...{account.slice(account.length-6)}
            </span><span> </span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12"><label className="labels">Username</label>
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
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Email</label>
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

                    <div className="col-md-12 mt-3"><label className="labels">Location</label>
                      <input type="text" className="form-control" value={location} onChange={(e)=> setLocation(e.target.value)} placeholder="enter location"/>
                    </div>

                    <div className="col-md-12 my-3"><label className="labels">Bio</label>
                    <textarea rows={3} className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter Bio" />
                    </div>
                    <div className="row mt-2">
                    <div className="col-md-12"><label className="labels">Github Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gitProfile"
                      placeholder="Enter Github Profile username"
                      value={gitprofile}
                      onChange={validateGitProfile}
                      required
                 />
                  {gitError?<div className="text-danger" >Github username cannot be blank</div>:<></>}
                    </div>
                </div>
                </div>
                
                <div className="mt-5 text-center"><button onClick={handleSignup} className="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="pt-5">
            <div className="d-flex justify-content-between align-items-center ">
              <h4>Experience</h4>               
            </div><br/>
            <div className="row">
            <div className="col-md-12"><label className="labels">Skills</label></div>

          <div className="col-12 text-secondary">
        <div className="input-group mb-3">
             <select
            className="form-control"
            id="skillSelect"
            onChange={handleSkillAdd}
            >
          <option defaultValue="">-- Select a skill --</option>
            {skillsets?.map((item,key)=>{
                return <option key={key} value={key}>{item}</option>
            })}
          </select>
          </div>
                
                <div className="skills-list">
              {skills?.map((skill, index) => (
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
                </div>
                <div className="form-group my-2">
   <label htmlFor="certificates">Certificates</label>
    <ul style={{maxHeight:"40vh", overflowY:'scroll'}}>
   {certificates.map((certificate, index) => {
    console.log(index,certificate)
    return <CertificateCard key={index} certificate={certificate} index={index}></CertificateCard>

})}
  </ul>
  <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#certificateModal">
  Add Certificate
</button>
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
//     <div className="container p-5">
//       <div className='row d-flex justify-content-center'>
//         <div className='col-sm-6 col-md-10'>
//           <div className='container'>
//       <div className='card shadow'>
//         <div className='card-header text-center'>
//         <h3 >Sign up</h3>
//         </div>
//         <div className='card-body'>
//           <div className='container'>
//             <div className='row d-flex justify-content-center py-5'>
//               <div className='col-sm-6 d-flex justify-content-center'>
//                   <ConnectButton/>
//             </div>
//             </div>
//       {account?
//       <form id="signupform">
      
//       <div className="form-group">
//         <label htmlFor="username">Username</label>
//         <input
//           type="text"
//           className="form-control"
//           id="username"
//           placeholder="Enter username"
//           value={username}
//           onChange={validateusername}
//           required
//         />
//       {usernameError?<div className="text-danger" >Username cannot be blank</div>:<></>}
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email address</label>
//         <input
//           type="email"
//           className="form-control"
//           id="email"
//           aria-describedby="emailHelp"
//           placeholder="Enter email"
//           value={email}
//           onChange={validatemail}
//           required
//         />
//               {emailError?<div className="text-danger">Enter a valid email address</div>:<></>}

//       </div>
//       <div className="form-group">
//         <label htmlFor="bio">Bio</label>
//         <textarea
//           type="text"
//           rows={3}
//           className="form-control"
//           id="bio"
//           placeholder="Enter bio"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="Wallet">Wallet ID</label>
//         <input
//           type="text"
//           className="form-control"
//           id="wallet"
//           placeholder="Enter username"
//           value={account}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="location">Location</label>
//         <input
//           type="text"
//           className="form-control"
//           id="location"
//           placeholder="Enter location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </div>
//   <div className="form-group">
//   <label htmlFor="skills">Skills</label>
//   <div className="input-group mb-3">
//     <select
//       className="form-control"
//       id="skillSelect"
//       onChange={handleSkillAdd}
//     >
//       <option defaultValue="">-- Select a skill --</option>
//       {skillsets.map((item,key)=>{
//           return <option key={key} value={key}>{item}</option>
//       })}
//     </select>
//   </div>
//   <div className="skills-list">
//     {skills.map((skill, index) => (
//       <span
//         key={index}
//         className="badge badge-secondary mr-2"
//         onClick={() => handleSkillRemove(skill)}
//       >
//         {skillsets[skill]} &times;
//       </span>
//     ))}
//   </div>
// </div>


// <div className="form-group">
//   <label htmlFor="certificates">Certificates</label>
//   <ul>
//   {certificates.map((certificate, index) => {
//     return <CertificateCard key={index} certificate={certificate} index={index}></CertificateCard>

// })}
//   </ul>
//   <button type="button" className="btn" data-toggle="modal" data-target="#certificateModal">
//   Add Certificate
// </button>
// </div>


//         <button disabled={usernameError || emailError} className='btn btn-primary test-white' onClick={handleSignup}>
//         Sign up
//         </button>
//       </form>:<p className='text-center'>Connect to your wallet to use the application</p>}
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>

    
  )
}
